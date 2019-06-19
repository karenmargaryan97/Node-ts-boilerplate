import { NextFunction, Request, Response } from 'express';
import { ITask, IUser } from '../../../interfaces/models';
import { IParams } from '../../../interfaces/globals';
import { CREATED_CODE, NO_CONTENT_CODE, SUCCESS_CODE } from '../../configs/status-codes';
import { TaskService } from '../../services';

export class TaskController {

    public static async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const payload: ITask = req.body;
        const user: IUser = req.user;
        try {
            payload.owner = user._id;
            const task: ITask = await TaskService.create(payload);

            return res.status(CREATED_CODE).json(task);
        } catch (e) {
            next(e);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const payload: ITask = req.body;
        const { id }: IParams = req.params;
        try {
            const task: ITask = await TaskService.getById(id);

            const updatedTask: ITask = await TaskService.update(task._id, payload);

            return res.status(CREATED_CODE).json(updatedTask);
        } catch (e) {
            next(e);
        }
    }

    public static async getOne(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id }: IParams = req.params;
        try {
            const task: ITask = await TaskService.getById(id);

            return res.status(SUCCESS_CODE).json(task);
        } catch (e) {
            next(e);
        }
    }

    public static async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const user: IUser = req.user;
        try {
            const tasks: ITask[] = await TaskService.getByOwner(user._id);

            return res.status(SUCCESS_CODE).json(tasks);
        } catch (e) {
            next(e);
        }
    }

    public static async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id }: IParams = req.params;
        try {
            const task: ITask = await TaskService.getById(id);

            await TaskService.delete(task._id);

            return res.status(NO_CONTENT_CODE).json({ success: true });
        } catch (e) {
            next(e);
        }
    }
}
