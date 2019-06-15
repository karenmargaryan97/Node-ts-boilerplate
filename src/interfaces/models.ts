import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    id?: string;
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    generatePassword: (pw: string) => string;
    comparePassword: (pw: string) => boolean;
}

export interface ITask extends Document {
    _id: Schema.Types.ObjectId;
    owner: Schema.Types.ObjectId | IUser;
    title: string;
    content: string;
    deadline: Date,
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
