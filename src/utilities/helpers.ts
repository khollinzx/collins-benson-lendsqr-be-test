/**
 * import the configuration file
 */
import {Response, NextFunction} from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import fs from "fs";
import bcrypt from 'bcrypt';
const saltRounds = 10;

/** *******************************
 *  Response Code Helpers
 ********************************* */
export const responseCode = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOW: 405,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    ACCOUNT_NOT_VERIFIED: 209,
};

/**
 *
 * @param {object} res response object
 * @param {number} statusCode
 * @param {string} message
 * @param {*} data
 * @returns {object} res
 */
export function successResponse (res : Response, statusCode : any = responseCode.SUCCESS,
                                    message: any = 'success', data = null) {
    res.status(statusCode).json({
        status: true,
        message,
        data,
    });
};


/**
 *
 * @param res
 * @param statusCode
 * @param message
 * @param errors
 * @param files
 */
export function errorResponse (res : Response , statusCode: any = responseCode.NOT_FOUND, message: any = 'error', errors :any | undefined = [], files: { [x: string]: { path: fs.PathLike; }; } | undefined) {
    if (files){
        const size = Object.keys(files).length;
        if(size > 0){
            for (const key in files) {
                fs.unlinkSync(files[key].path);
            }
        }}
    res.status(statusCode).json({
        status: false,
        message,
        errors,
    });
};



/**
 * The validation rule
 * @param object
 * @param res
 * @param next
 * @param schema
 */
export const validateRequest = (object: { files: any; }, res: Response, next: NextFunction, schema: any) => {
    const FormattedError: any[] = [];

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: false, // ignore unknown props
        // stripUnknown: true, // remove unknown props
    };

    const { error, data } = schema.validate(object, options);

    if (error) {
        /**
         * loop through the error messages and return readable error message
         */
        error.details.forEach((e: { message: string; }) => {
            FormattedError.push(e.message.replace(/"/g, ''));
        });

        /**
         * returns a single error at a time
         */
        return errorResponse(
            res,
            responseCode.UNPROCESSABLE_ENTITY,
            'A validation error has occurred',
            FormattedError,
            object.files,
        );
    }
    // req.body = req.body;

    return next();
};
/**
 * hash passwords
 * @returns {Promise<void>}
 * @param password
 */
export const hashPassword = async (password: string | Buffer) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hashSync(password, salt);
};

/**
 * Compare passwords with Database
 * @param inputPassword
 * @param dbPassword
 */
export const comparePasswords = (inputPassword: string | Buffer, dbPassword: string) => {
    if (!bcrypt.compareSync(inputPassword, dbPassword)) return false;

    return true;
};

/**
 * generate Token
 * @param payload
 */
export const generateJWT = (payload: string | object | Buffer) => {
    // @ts-ignore
    return jwt.sign(payload, config.jwtKey, { expiresIn: '1d' });
};


// @ts-ignore
export const verifyJWT = (token: string) => jwt.verify(token, config.jwtKey);
