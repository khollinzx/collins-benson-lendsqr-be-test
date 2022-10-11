
import { UserRepo } from '../database/repositories/userRepo';
import { WalletRepo } from '../database/repositories/walletRepo';
import { TransactionHistoryRepo } from '../database/repositories/transactionHistoryRepo';
import {errorResponse, successResponse, responseCode, hashPassword, comparePasswords, generateJWT} from "../utilities/helpers";

class UserController {

    /**
     * get user details
     * @param req
     * @param res
     */
    async getUser (req: any, res: any) {
        try {

            const user = await UserRepo.getUserRecord('id', req.authUser.id)

            // @ts-ignore
            return successResponse(res, responseCode.SUCCESS, 'user details.', user);

        } catch (err) {

            console.log(err);
            // @ts-ignore
            return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);

        }
    }

    /**
     * getting user current wallet balance
     * @param req
     * @param res
     */
    async getUserWallet (req: any, res: any) {
        try {

            const wallet = await WalletRepo.getRecord('user_id', req.authUser.id)

            // @ts-ignore
            return successResponse(res, responseCode.SUCCESS, 'wallet details.', wallet);

        } catch (err) {

            console.log(err);
            // @ts-ignore
            return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);

        }
    }

    /**
     * getting user transaction histories
     * @param req
     * @param res
     */
    async getTransactionHistories (req: any, res: any) {
        try {

            const wallet = await TransactionHistoryRepo.getHistoryRecord('user_id', req.authUser.id)

            // @ts-ignore
            return successResponse(res, responseCode.SUCCESS, 'transaction histories.', wallet);

        } catch (err) {

            console.log(err);
            // @ts-ignore
            return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);

        }
    }

    /**
     * for creditting user own wallet
     * @param req
     * @param res
     */
    async fundWallet (req: any, res: any) {
        try {
            const {amount} = req.body;

            //get auth user wallet
            const wallet = await WalletRepo.getRecord('user_id', req.authUser.id)

            const payload = {
                initial: wallet.balance,
                balance: parseInt(wallet.balance) + parseInt(amount)
            }
            await WalletRepo.updateRecord(payload, 'user_id', req.authUser.id);

            const history = {
                amount: amount,
                user_id: req.authUser.id,
                remark: `you funded your wallet with ${amount}`
            }
            await TransactionHistoryRepo.create(history);

            // @ts-ignore
            return successResponse(res, responseCode.SUCCESS, 'funding was successful.');

        } catch (err) {

            console.log(err);
            // @ts-ignore
            return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);

        }
    }

    /**
     *  for transferring of funds
     * @param req
     * @param res
     */
    async transferFund (req: any, res: any) {
        try {
            const {amount, receiver_id} = req.body;

            if ( req.authUser.id === receiver_id)
                return errorResponse(res, responseCode.BAD_REQUEST, 'sorry you can\'t transfer money to yourself', [], {});

            const sender = await UserRepo.getUserRecord('id', req.authUser.id) //check if email already exist

            const receiver = await UserRepo.getUserRecord('id', receiver_id) //check if email already exist
            if (!receiver)
                return errorResponse(res, responseCode.BAD_REQUEST, 'No such user found', [], {});

            //get auth user wallet
            const senderWallet = await WalletRepo.getRecord('user_id', sender.id)

            //get auth user wallet
            const receiverWallet = await WalletRepo.getRecord('user_id', receiver.id)

            if(senderWallet.balance < amount)
                return errorResponse(res, responseCode.BAD_REQUEST, 'insufficient balance', [], {});

            //set values
            const payload = {
                initial: senderWallet.balance,
                balance: parseInt(senderWallet.balance) - parseInt(amount)
            }
            await WalletRepo.updateRecord(payload, 'user_id', sender.id);

            //set sender history record
            const sendHistory = {
                amount: amount,
                user_id: sender.id,
                remark: `you transferred ${amount} to ${receiver.name}`
            }
            await TransactionHistoryRepo.create(sendHistory);

            //credit receiver's wallet
            const receiverPayload = {
                initial: receiverWallet.balance,
                balance: parseInt(receiverWallet.balance) + parseInt(amount)
            }
            await WalletRepo.updateRecord(receiverPayload, 'user_id', receiver.id);

            //set sender history record
            const receiverHistory = {
                amount: amount,
                user_id: receiver.id,
                remark: `you received ${amount} from ${sender.name}`
            }
            await TransactionHistoryRepo.create(receiverHistory);

            return successResponse(res, responseCode.SUCCESS, 'transfer was successful.');
        } catch(err) {

            console.log(err);
            // @ts-ignore
            return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
        }
    }

    /**
     *  for withdrawal of funds
     * @param req
     * @param res
     */
    async withdrawFund (req: any, res: any) {
        try {
            const {amount} = req.body;

            //get auth user wallet
            const wallet = await WalletRepo.getRecord('user_id', req.authUser.id)

            if(wallet.balance < amount)
                return errorResponse(res, responseCode.BAD_REQUEST, 'insufficient balance', [], {});

            const payload = {
                initial: wallet.balance,
                balance: parseInt(wallet.balance) - parseInt(amount)
            }
            await WalletRepo.updateRecord(payload, 'user_id', req.authUser.id);

            const history = {
                amount: amount,
                user_id: req.authUser.id,
                remark: `you withdrew ${amount} from your wallet`
            }
            await TransactionHistoryRepo.create(history);

            // @ts-ignore
            return successResponse(res, responseCode.SUCCESS, 'withdrawal was successful.');

        } catch (err) {

            console.log(err);
            // @ts-ignore
            return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);

        }
    }

}

export {UserController}
