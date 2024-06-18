  <div style="text-align: center">
  
  # Wallet API 💰
    
  </div>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
</p>

## Description

This project is a REST Wallet API, the main purpose is to receive events of operations into the wallet balance and get information.
Based in NestJS and using Prisma ORM.

## Business Rules

- It should be referred to as a digital wallet;
- To make the requests the user must be recorded in database (by dump);
- Must check the wallet balance;
- Must consult the statement with all the operations;
- When the user does not exist, NOT FOUND must be returned for all endpoints;
- It must carry out balance operations;
  - Adding Values;
    - Should only add values higher than $0.1;
  - Withdrawals;
    - Should only withdraw if the balance is positive;
    - Should only withdraw values higher than $0.1;
  - Entering Purchasing values;
    - If there is no balance, it becomes negative;
  - Cancellation and reversal will be treated as the same operation;
- Requests to the wallet can come from various channels;
  - Requests can be received a middleware or a webhook based on Event Listener and added to a queue for processing each event.
    (Wasn't able to finish this)

## Docker Container

Exposed in port 3000. Use - localhost:3000/wallet - to requests.

```bash
#To create the containers
$ docker compose up --build
```

```bash
#To apply the migrations into database
$ npm run db:up
```

## Running the app

Create a .env file into the root directory. Must have your local database URL.

```
DATABASE_URL=mysql://youruser:yourpass@localhost:3306/wallet
```

Run:

```bash
$ npm install --legacy-peer-deps

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Swagger

To access the swagger use this endpoint: /swagger-docs.

## DDD Architecture

The disposition of the folders are as the image bellow.

![Folders disposition](/public/ddd.png)

![Service Disposition](/public/services-disposition.png)

## ERM Diagram

This project uses a database with entity relationship, that so this is the model diagram that represents it.

![ERM Diagram](/public/erm.png)

## Service Architeture

![Service Architeture](/public/service.png)

## Support

Nest is an MIT-licensed open source project. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
