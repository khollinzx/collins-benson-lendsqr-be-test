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

## Base URL
The project is hosted on heroku:
API URL: https://collins-benson-lendsqr-be-test.herokuapp.com/api/v1/

## E-R Diagram

The ER Diagram for the models can by view on this link <https://dbdiagram.io/d/6345f6ccf0018a1c5fe3044b>

<img width="1678" alt="ER_Diagram" src="https://user-images.githubusercontent.com/44474846/195743850-c451d6e0-34c1-4784-bb3b-933769c2f4a2.png">



The Tested implementation was created with

- Jest
- Supertest

## Appreciation
I would like to say a big thank you to the LendSQR team for such an amazing assessment.
