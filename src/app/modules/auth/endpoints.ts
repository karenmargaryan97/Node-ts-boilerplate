import { AuthController } from './auth.controller';
import middlewares from '../../middlewares/index';
import schemas from './schemas';
import { Router } from  'express';

export default (router: Router): void => {
    router.post('/login', ...middlewares(schemas, 'login'), AuthController.login);
    router.post('/register', ...middlewares(schemas, 'register'), AuthController.register);
    router.get('/logout', ...middlewares(schemas, 'auth'), AuthController.logout);
};
