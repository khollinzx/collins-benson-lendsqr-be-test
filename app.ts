/**
 * Import all necessary modules
 */
import express, {Express, Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import bodyParser from 'body-parser';
import config from "./config";
import {errorResponse, successResponse, responseCode} from './src/utilities/helpers';
import apiRoute from './src/routes/index'

// Initialize App
const app: Express = express();

app.get('/', ((req: Request, res: Response) => res.send(`it works, welcome to ${config.appName} api V1`)));
// Accept only application/json
// eslint-disable-next-line consistent-return
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.headers.accept !== 'application/json') { // @ts-ignore
        return errorResponse(res, 415, 'Header error', ['Pls add application/json to the accept header.']); }

    next();
});

// Add application/json as content-type header to response
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('charset', 'utf-8');
    res.setHeader('content-type', 'application/json');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Application Route

//
// // Set the default route
app.use('/api/v1', apiRoute);

// handle 404 error
app.use((req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    errorResponse(res, responseCode.NOT_FOUND, 'Not Found', ["The resource you're trying to access was not found."]);
    next();
});

/**
 * handle errors
 */
app.use((err, req:Request, res: Response) => {
    if (err.statusCode === 404) { // @ts-ignore
        errorResponse(res, responseCode.NOT_FOUND, 'Not Found', ['The resource you\'re trying to access was not found..']); } else {
        // @ts-ignore
        errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'Server error', [err]);
    }
});

export default app;
