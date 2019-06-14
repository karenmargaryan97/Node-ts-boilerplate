import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    id?: string;
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    generatePassword(pw: string);
    comparePassword(pw: string);
}
