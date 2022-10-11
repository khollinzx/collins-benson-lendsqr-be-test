import knex from "knex";
import KnexFile from '../../knexfile';
import config from '../../config';

// @ts-ignore
const DB = knex(KnexFile[config.nodeEnv]);

export default DB;
