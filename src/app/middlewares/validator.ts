import { ServiceUnavailable, ValidationError } from '../errors';
import { Request, Response, NextFunction } from 'express';
import { Result } from 'express-validator/check';

export default (schema: any = null): any => {

    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        if (schema) {
            req.check(schema);
        }

        let result: Result;

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
