import { Schema } from 'mongoose';

export interface Error {
    status?: number;
    message?: string;
    errors?: Array<any>;
}

export interface IJWTSignPayload {
    id: Schema.Types.ObjectId;
    created_at: string;
}

export interface IJWTPayload {
    token: string;
}
