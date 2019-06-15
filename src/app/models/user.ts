import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { model, Schema } from 'mongoose';
import { IUser } from '../../interfaces/models';

export default () => {
    let UserSchema: Schema = new Schema<IUser>({
        fullName: { type: String, required: true },
        email: { type: String, lowercase: true, required: true, index: true },
        password: { type: String },
        createdAt: Date,
        updatedAt: Date
    });

    UserSchema.pre<IUser>('save', function (next) {
        const now: Date = new Date();

        this.updatedAt = now;

        if (!this.createdAt) {
            this.createdAt = now;
        }

        next();
    });

    UserSchema.methods.generatePassword = function(pw: string): string {
        return hashSync(pw, genSaltSync(8));
    };

    UserSchema.methods.comparePassword = function(pw: string): boolean {
        return this.password && compareSync(pw, this.password);
    };

    return model<IUser>('User', UserSchema);
};
