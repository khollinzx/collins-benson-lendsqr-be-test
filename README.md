# Demo Credit
Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

## Application Description

This application was built with:
- NodeJS, 
- Express, 
- TypeScript 
- MySQL2 
- Knex.JS ORM

Trying to get started?

- Make sure to have node & git installed on your computer
- Clone this project using this link - <https://github.com/khollinzx/collins-benson-lendsqr-be-test>
- Create a .env file and add all the variables as shown in the .env.example
  the following variables are required:
    - PORT
    - NODE_ENV
    - JWT_KEY
    - DEV_DB details
    - TEST_DB details

- Run `npm install` to install the modules
- Run `npm run dev` to start the server

## To run the test
- Create a test database
- Edit the `TEST_DB details` on the `.env` file.
- Open the `Knexfile.ts` and edit the test objects section.
- Run `npm run test` to run the test suite


The Tested implementation was created with

- Jest
- Supertest

## Appreciation
I would like to say a big thank you to the LendSQR team for such an amazing assessment.
