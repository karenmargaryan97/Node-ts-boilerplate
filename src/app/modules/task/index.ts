import { Router } from 'express';
import taskEndpoints from './endpoints';

export default class TaskModule {
    apiRouter;
    router;

    constructor(apiRouter) {
        this.apiRouter = apiRouter;
        this.router = Router();
    }

    createEndpoints() {
        this.assignRouter();
        this.assignEndpoints();
    }

    assignRouter() {
        this.apiRouter.use('/tasks', this.router);
    }

    assignEndpoints() {
        taskEndpoints(this.router);
    }
}
