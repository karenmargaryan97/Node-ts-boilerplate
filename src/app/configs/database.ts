import * as mongoose from 'mongoose';
import { mongoUri } from '../helpers/config';
import models from '../models';

(async (): Promise<mongoose.Mongoose> => {
    (async (): Promise<mongoose.Mongoose> => {
        const timeout: number = 30 * 1000;
        const options: mongoose.ConnectionOptions = {
            connectTimeoutMS: timeout,
            keepAlive: true,
            reconnectInterval: 500,
            reconnectTries: Number.MAX_VALUE,
            useCreateIndex: true,
            useNewUrlParser: true
        };

        return await mongoose.connect(mongoUri, options);
    })();

    if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
    }

    models();

    mongoose.connection.on('error', (err: Error): void => {
        console.error('Mongoose connection: error - ' + err);
    });

    mongoose.connection.on('connected', (): void => {
        console.info('Mongoose connection: connected');
    });

    mongoose.connection.on('open', (): void => {
        console.info('Mongoose connection: open');
    });

    mongoose.connection.on('reconnected', (): void => {
        console.info('Mongoose connection: reconnected');
    });

    mongoose.connection.on('disconnected', (): void => {
        console.warn('Mongoose connection: disconnected');
    });

    process.on('SIGINT', (): void => {
        mongoose.disconnect(() => {
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        mongoose.disconnect(() => {
            process.exit(0);
        });
    });

    return await mongoose;
})();
