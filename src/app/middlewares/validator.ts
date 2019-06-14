import { ServiceUnavailable, ValidationError } from '../errors';
import { Request, Response, NextFunction } from "express";

export default (schema: object = null): any => {

    return async (req: any, res: Response, next: NextFunction): Promise<any> => {
        if (schema) {
            req.check(schema);
        }

        let result;
        try {
            result = await req.getValidationResult();
        } catch (error) {
            return next(new ServiceUnavailable(error.message));
        }

        if (result && !result.isEmpty()) {
            return next(new ValidationError(result.mapped()));
        }

        next();
    };
};
