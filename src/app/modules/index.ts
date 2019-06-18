import { Router } from 'express';
import AuthModule from './auth';
import TaskModule from './task';

export default (router: Router): void => {

    const auth: AuthModule = new AuthModule(router);
    const task: TaskModule = new TaskModule(router);

    const modules: any = [
        auth,
        task
    ];

    modules.forEach((module: any) => module.createEndpoints());
};
