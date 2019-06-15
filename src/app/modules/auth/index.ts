import { Router } from 'express';
import authEndpoints from './endpoints';

export default class AuthModule {
    apiRouter: Router;
    router: Router;

    constructor(apiRouter: Router) {
        this.apiRouter = apiRouter;
        this.router = Router();
    }

    createEndpoints() {
        this.assignRouter();
        this.assignEndpoints();
    }

    assignRouter() {
        this.apiRouter.use('/auth', this.router);
    }

    assignEndpoints() {
        authEndpoints(this.router);
    }
}
