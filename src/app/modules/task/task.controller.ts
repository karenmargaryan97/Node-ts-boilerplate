import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../../services';
import { SUCCESS_CODE, CREATED_CODE, NO_CONTENT_CODE } from '../../configs/status-codes';
import { BadRequest, NotFound } from '../../errors';
import { ITask, IUser } from '../../../interfaces/models';

export class TaskController {

    public static async create(req: Request, res: Response, next: NextFunction) {
        let payload: ITask = req.body;
        const user: IUser = req.user;
        try {
            payload.owner = user._id;
            const task: ITask = await TaskService.create(payload);

            return res.status(CREATED_CODE).json(task);
        } catch (e) {
            next(e);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        let payload: ITask = req.body;
        const { id } = req.params;
        try {
            const task: ITask = await TaskService.getById(id);

            const updatedTask: ITask = await TaskService.update(task._id, payload);

            return res.status(CREATED_CODE).json(updatedTask);
        } catch (e) {
            next(e);
        }
    }

    public static async getOne(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const task: ITask = await TaskService.getById(id);

            return res.status(SUCCESS_CODE).json(task);
        } catch (e) {
            next(e);
        }
    }

    public static async getAll(req: Request, res: Response, next: NextFunction) {
        const user: IUser = req.user;
        try {
            const tasks: ITask[] = await TaskService.getByOwner(user._id);

            return res.status(SUCCESS_CODE).json(tasks);
        } catch (e) {
            next(e);
        }
    }
}
