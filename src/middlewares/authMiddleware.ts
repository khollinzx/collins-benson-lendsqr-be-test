import {errorResponse, verifyJWT, responseCode} from "../utilities/helpers";


class AuthMiddleware {

    /**
     *
     * this method verifies the jwt stored in the header and stores the decoded info to req.currentAdmin
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @return {*}
     */
    currentUser(req: any, res: any, next: any) {
        try {
            const { authorization } = req.headers;

            if (!authorization)
                // @ts-ignore
                return errorResponse(res, responseCode.UNAUTHORIZED, 'Please input authorization token');

            const token = authorization.split(' ')[1];

            try {
                 if(!verifyJWT(token))
                    { // @ts-ignore
                        return errorResponse(res, responseCode.UNAUTHORIZED, 'Unauthorized');
                    }

                 req.authUser = verifyJWT(token)
            } catch (error) {
                // @ts-ignore
                return errorResponse(res, responseCode.UNAUTHORIZED, 'Authentication failed.');
            }
            return next();
        } catch (err) {
            console.log(err);
            // @ts-ignore
            return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred.', err);
        }
    }
}
export {AuthMiddleware}
