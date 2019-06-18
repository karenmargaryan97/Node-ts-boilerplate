import { Schema } from 'mongoose';

export interface IError {
    status?: number;
    message?: string;
    errors?: any;
}

export interface IJWTSignPayload {
    id: Schema.Types.ObjectId;
    created_at: string;
}

export interface IJWTPayload {
    token: string;
}

export interface IParams {
    id: string;
}
