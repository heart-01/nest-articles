import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.databaseService.article.create({ data: createArticleDto });
  }

  findDrafts() {
    return this.databaseService.article.findMany({
      where: { published: false },
    });
  }

  findAll() {
    return this.databaseService.article.findMany({
      where: { published: true },
    });
  }

  findOne(id: number) {
    return this.databaseService.article.findUnique({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.databaseService.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.databaseService.article.delete({ where: { id } });
  }
}
