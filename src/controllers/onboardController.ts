import {Request, Response} from 'express';
import { UserRepo } from '../database/repositories/userRepo';
import { WalletRepo } from '../database/repositories/walletRepo';
import {errorResponse, successResponse, responseCode, hashPassword, comparePasswords, generateJWT} from "../utilities/helpers";

class OnboardController {

    /**
     *  create a new account
     * @param req
     * @param res
     */
    async signUp (req: Request, res: Response) {
        try {
            const { name, email, password } = req.body //destruct body

            const user = await UserRepo.getUserRecord('email', email) //check if email already exist

            if (user)
                // @ts-ignore
                return errorResponse(res, responseCode.BAD_REQUEST, 'User with same email already exist');

            //set values
            const data = {
                name,
                email,
                password: await hashPassword(password) //hash password
            }

            const userRecord = await UserRepo.create(data); //create user
            await WalletRepo.create({user_id: userRecord.id}); //create user

            if (userRecord.password) delete userRecord.password //remove password from the object

            // @ts-ignore
            return successResponse(res, responseCode.SUCCESS, 'account creation was successful.', userRecord);
        } catch(err) {

            console.log(err);
            // @ts-ignore
            return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
        }
    }

    /**
     *  login user
     * @param req
     * @param res
     */
    async login (req: Request, res: Response) {
        try {
            const {email, password } = req.body //destruct body

            const user = await UserRepo.getUserRecord('email', email) //check if email already exist

            if (!user)
                // @ts-ignore
                return errorResponse(res, responseCode.BAD_REQUEST, 'invalid login credentials');

            //compare password
            const validpass = await comparePasswords(password, user.password);
            if (!validpass)
                // @ts-ignore
                return errorResponse(res, responseCode.BAD_REQUEST, 'incorrect password.');

            //removing password
            if (user.password) delete user.password //remove password from the object

            //generate token
            const token = generateJWT({ id: user.id, email });

            // @ts-ignore
            return successResponse(res, responseCode.SUCCESS, 'user login successful.', {access_token: token, user});
        } catch(err) {

            console.log(err);
            // @ts-ignore
            return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
        }
    }

}

export {OnboardController}
