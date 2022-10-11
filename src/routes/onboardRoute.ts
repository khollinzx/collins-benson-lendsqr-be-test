import {Router, Request, Response} from "express";
import {OnboardController} from "../controllers/onboardController";
import {JoiValidations} from "../middlewares/joiValidations";

const {validateCreateAccount, validateLoginAccount} = new JoiValidations();

const router = Router();

const onboardController = new OnboardController();

router.post('/signUp', validateCreateAccount, onboardController.signUp);
router.post('/login', validateLoginAccount, onboardController.login);

export default router
