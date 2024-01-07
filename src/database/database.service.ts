import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    this.$use(this.loggingMiddleware);
    this.$use(this.articleSoftDeleteMiddleware);
    this.$use(this.articleFindMiddleware);
  }

  loggingMiddleware: Prisma.Middleware = async (params, next) => {
    console.log(
      `${params.action} ${params.model} ${JSON.stringify(params.args)}`,
    );

    const result = await next(params);

    console.log(result);

    return result;
  };

  articleSoftDeleteMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.model !== 'Article') {
      return next(params);
    }
    if (params.action === 'delete') {
      return next({
        ...params,
        action: 'update',
        args: {
          ...params.args,
          data: {
            deletedAt: new Date(),
          },
        },
      });
    }
    return next(params);
  };

  articleFindMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.model !== 'Article') {
      return next(params);
    }
    if (params.action === 'findUnique' || params.action === 'findFirst') {
      return next({
        ...params,
        action: 'findFirst',
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deletedAt: null,
          },
        },
      });
    }
    if (params.action === 'findMany') {
      return next({
        ...params,
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deletedAt: null,
          },
        },
      });
    }
    return next(params);
  };

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
