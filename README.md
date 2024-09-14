# Multi App Backend

* Utilizing NestJS and ExpressJS
* Utilizing PostgreSQL and TypeORM
  * ```yarn add @nestjs/typeorm typeorm pg```
* Custom "subapp generator" used to create and tie in each new subapp's backend

* typeorm-cli.config tells TypeORM how to connect to the database and which files are entities and migrations

## TODO

* [x] Setup Subapp Generator
* [ ] Setup IAM
  * [ ] Setup User Resources
  * [ ] Setup Auth
  * [ ] Setup Google Login
* [ ] Setup Postgres Database

-------------------

## App Written using Nest.JS - ALl of the following is from the original NestJS starter README

### Description (NestJS)

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Installation (NestJS)

```bash
yarn install
```

### Running the app (NestJS)

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test (NestJS)

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Support (NestJS)

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

### Stay in touch (NestJS)

* Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
* Website - [https://nestjs.com](https://nestjs.com/)
* Twitter - [@nestframework](https://twitter.com/nestframework)

### License (NestJS)

Nest is [MIT licensed](LICENSE).
