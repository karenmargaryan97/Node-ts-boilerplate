import { ITask } from '../../interfaces/models';

import { Schema, Model, model, QueryFindOneAndUpdateOptions } from 'mongoose';
import { NotFound } from '../errors';
import { NOT_EXISTS } from '../configs/constants';
const Task: Model<ITask> = model('Task');

export class TaskService {
    constructor() { }

    public static async create(task: ITask): Promise<ITask> {
        return await Task.create(task);
    }

    public static async getById(_id: String | Schema.Types.ObjectId): Promise<ITask> {
        let task = await Task.findOne({ _id });

        if (!task) {
            throw new NotFound(NOT_EXISTS('Task'));
        }

        return task;
    }

    public static async getByOwner(owner: Schema.Types.ObjectId): Promise<ITask[]> {
        return await Task.find({ owner });
    }

    public static async update(_id: String | Schema.Types.ObjectId, attributes: ITask): Promise<ITask> {
        const options: QueryFindOneAndUpdateOptions = { new: true };

        return await Task.findByIdAndUpdate({ _id }, attributes, options);
    }
}
