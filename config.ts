// Import env package
import * as dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT,
    DB_DIALECT: process.env.DB_DIALECT,
    nodeEnv: process.env.NODE_ENV,
    jwtKey: process.env.JWT_KEY,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    appName: process.env.APP_NAME
};
