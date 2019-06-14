export interface Error {
    status?: number;
    message?: string;
    errors?: Array<object>;
}

export interface IJWTSignPayload {
    id: string;
    created_at: string;
}

export interface IJWTPayload {
    token: string;
}
