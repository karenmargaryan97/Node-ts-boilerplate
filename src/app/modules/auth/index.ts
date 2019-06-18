import { Router } from 'express';
import authEndpoints from './endpoints';

export default class AuthModule {
    public readonly router: Router;
    private apiRouter: Router;

    constructor(apiRouter: Router) {
        this.apiRouter = apiRouter;
        this.router = Router();
    }

    public createEndpoints(): void {
        this.assignRouter();
        this.assignEndpoints();
    }

    public assignRouter(): void {
        this.apiRouter.use('/auth', this.router);
    }

    public assignEndpoints(): void {
        authEndpoints(this.router);
    }
}
