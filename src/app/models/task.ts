import { model, Schema } from 'mongoose';
import { ITask } from '../../interfaces/models';

export default () => {
    let TaskSchema: Schema = new Schema<ITask>({
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        deadline: { type: Date, required: true },
        completed: { type: Boolean, default: false },
        createdAt: Date,
        updatedAt: Date
    });

    TaskSchema.pre<ITask>('save', function (next) {
        const now: Date = new Date();

        this.updatedAt = now;

        if (!this.createdAt) {
            this.createdAt = now;
        }

        next();
    });

    return model<ITask>('Task', TaskSchema);
}
