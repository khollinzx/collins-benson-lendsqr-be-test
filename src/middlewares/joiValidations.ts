import Joi from 'joi';
import {Request, Response, NextFunction} from 'express';
import {validateRequest} from '../utilities/helpers'

class JoiValidations {

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    async validateCreateAccount(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            name: Joi.string().empty().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'co'] } }).empty().required(),
            password: Joi.string().empty().required(),
        });

        await validateRequest(req.body, res, next, schema);
    }

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    async validateLoginAccount(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'co'] } }).empty().required(),
            password: Joi.string().empty().required(),
        });

        await validateRequest(req.body, res, next, schema);
    }

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    async validateFunding(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            amount: Joi.number().required().greater(500)
        });

        await validateRequest(req.body, res, next, schema);
    }

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    async validateFundTransfer(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            amount: Joi.number().required().greater(500),
            receiver_id: Joi.number().required()
        });

        await validateRequest(req.body, res, next, schema);
    }
}

export {JoiValidations}
