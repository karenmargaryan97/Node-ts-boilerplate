import AuthModule from './auth';
import TaskModule from './task';

export default (router) => {

    const auth = new AuthModule(router);
    const task = new TaskModule(router);

    const modules = [
        auth,
        task
    ];

    modules.forEach((module) => module.createEndpoints());
};
