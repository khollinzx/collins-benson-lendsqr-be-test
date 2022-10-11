import {Router, Request, Response} from "express";
import {UserController} from "../controllers/userController";
import {JoiValidations} from "../middlewares/joiValidations";
import {AuthMiddleware} from "../middlewares/authMiddleware";

const { validateFunding, validateFundTransfer} = new JoiValidations();
const {currentUser} = new AuthMiddleware();

const router = Router();

const userController = new UserController();

router.get('/get', currentUser, userController.getUser);
router.get('/wallet/get', currentUser, userController.getUserWallet);
router.post('/fund', currentUser, validateFunding, userController.fundWallet);
router.post('/withdraw/fund', currentUser, validateFunding, userController.withdrawFund);
router.get('/transactions/get', currentUser, userController.getTransactionHistories);
router.post('/transfer/fund', currentUser, validateFundTransfer, userController.transferFund);

export default router
