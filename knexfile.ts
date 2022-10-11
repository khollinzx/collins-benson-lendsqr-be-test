import { Knex } from "knex";
import config from './config'

// Update with your config settings.

const Knexfile: { [key: string]: Knex.Config } = {
  development: {
    debug: true,
    client: "mysql",
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
    client: "mysql",
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
