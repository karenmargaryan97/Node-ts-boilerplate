import validator from './validator';
import passport from './passport';
import { USER_AUTH } from '../configs/constants';

export default (schemas: any, actionName: string): any => {
    const middlewares: any[] = [];

    if (!schemas[actionName]) {
        return middlewares;
    }

    if (schemas[actionName].authentication) {
        middlewares.push(passport(USER_AUTH));
    }

    if (schemas[actionName].validation) {
        middlewares.push(validator(schemas[actionName].validation));
    }

    return middlewares;
};
