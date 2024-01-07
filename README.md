## REST-API-NestJS-Prisma-Articles

NestJS, Prisma, MySQL and Swagger. 

### Installation

1. Install dependencies: `npm install`
2. Start a MySQL database with docker using: `docker-compose up -d`. 
    - If you have a local instance of MySQL running, you can skip this step. In this case, you will need to change the `DATABASE_URL` inside the `.env` file with a valid [MySQL connection string](https://www.prisma.io/docs/orm/overview/databases/mysql#connection-details) for your database. 
3. Apply database migrations: `npx prisma migrate dev` 
4. Start the project:  `npm run start:dev`
5. Access the project at http://localhost:3030/api/v1