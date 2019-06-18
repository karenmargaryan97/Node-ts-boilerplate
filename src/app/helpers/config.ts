import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    config();
}

import * as env from 'env-var';

export const mongoUri: string = env.get('MONGODB_URI').asString();

export const apiUrl: string = env.get('API_URL').asString();
export const appUrl: string = env.get('APP_URL').asString();
export const apiPort: string = env.get('PORT').asString();

export const tokenSecret: string = env.get('TOKEN_SECRET').asString();
