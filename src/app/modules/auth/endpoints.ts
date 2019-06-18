import { Router } from 'express';
import middlewares from '../../middlewares/index';
import { AuthController } from './auth.controller';
import schemas from './schemas';

export default (router: Router): void => {
    router.post('/login', ...middlewares(schemas, 'login'), AuthController.login);
    router.post('/register', ...middlewares(schemas, 'register'), AuthController.register);
    router.get('/logout', ...middlewares(schemas, 'auth'), AuthController.logout);
};
