import { NextFunction } from 'express';
import { Model, model, Schema } from 'mongoose';
import { ITask } from '../../interfaces/models';

export default (): Model<ITask> => {
    const TaskSchema: Schema = new Schema<ITask>({
        completed: { type: Boolean, default: false },
        content: { type: String, required: true },
        createdAt: Date,
        deadline: { type: Date, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        title: { type: String, required: true },
        updatedAt: Date
    });

    TaskSchema.pre<ITask>('save', function(next: NextFunction): void {
        const now: Date = new Date();

        this.updatedAt = now;

        if (!this.createdAt) {
            this.createdAt = now;
        }

        next();
    });

    return model<ITask>('Task', TaskSchema);
};
