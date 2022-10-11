import { Knex } from "knex";
import config from './config'

// Update with your config settings.

const Knexfile: { [key: string]: Knex.Config } = {
  test: {
    debug: true,
    client: "mysql2",
    connection: {
      host : config.testHost,
      port : 3306,
      database: config.testDatabase,
      user: config.testUsername,
      password: config.testPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './src/database/migrations'
    },
  },

  development: {
    debug: true,
    client: "mysql2",
    connection: {
      host : config.host,
      port : 3306,
      database: config.database,
      user: config.username,
      password: config.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './src/database/migrations'
    },
  },

  staging: {
    client: "mysql2",
    connection: {
      host : config.host,
      port : 3306,
      database: config.database,
      user: config.username,
      password: config.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './src/database/migrations'
    },
  },

};

export default Knexfile;
