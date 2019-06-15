import { TaskController } from './task.controller';
import middlewares from '../../middlewares/index';
import schemas from './schemas';
import { Router } from  'express';

export default (router: Router): void => {
    router.post('/', ...middlewares(schemas, 'save'), TaskController.create);
    router.put('/:id', ...middlewares(schemas, 'save'), TaskController.update);
    router.get('/', ...middlewares(schemas, 'task'), TaskController.getAll);
    router.get('/:id', ...middlewares(schemas, 'task'), TaskController.getOne);
};
