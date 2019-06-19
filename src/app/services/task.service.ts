import { ITask } from '../../interfaces/models';

import { Schema, Model, model, QueryFindOneAndUpdateOptions } from 'mongoose';
const Task: Model<ITask> = model('Task');

import { NotFound } from '../errors';
import { NOT_EXISTS } from '../configs/constants';

export class TaskService {
    public static async create(task: ITask): Promise<ITask> {
        return await Task.create(task);
    }

    public static async getById(taskId: string | Schema.Types.ObjectId): Promise<ITask> {
        const task: ITask = await Task.findOne({ _id: taskId });

        if (!task) {
            throw new NotFound(NOT_EXISTS('Task'));
        }

        return task;
    }

    public static async getByOwner(owner: Schema.Types.ObjectId): Promise<ITask[]> {
        return await Task.find({ owner });
    }

    public static async update(taskId: ITask | Schema.Types.ObjectId, attributes: ITask): Promise<ITask> {
        const options: QueryFindOneAndUpdateOptions = { new: true };

        return await Task.findByIdAndUpdate({ _id: taskId }, attributes, options);
    }

    public static async delete(taskId: string | Schema.Types.ObjectId): Promise<ITask> {
        return await Task.findOneAndDelete({ _id: taskId });
    }
}
