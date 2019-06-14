import mongoose from 'mongoose';

export interface IUser {
    _id: mongoose.Schema.Types.ObjectId;
    id?: string;
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    generatePassword(pw: string);
}
