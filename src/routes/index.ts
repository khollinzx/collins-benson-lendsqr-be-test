import {Request, Response, Router} from "express";
import userRoute from "./userRoute";
import onboardRoute from "./onboardRoute";
import config from "../../config";

const router = Router();

router.use('/onboard', onboardRoute)
router.use('/users', userRoute)
router.get('/welcome', ((req: Request, res: Response) => res.send(`it works, welcome to ${config.appName} api V1`)))

export default router
