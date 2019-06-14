import {
    mongoUri
} from '../helpers/config';
import models from '../models';
import * as mongoose from 'mongoose';

function mongoConnection() {
    function connect() {
        const timeout: number = 30 * 1000;
        const options: object = {
            connectTimeoutMS: timeout,
            keepAlive: timeout,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            useCreateIndex: true,
            useNewUrlParser: true
        };

        return mongoose.connect(mongoUri, options);
    }

    connect();
    mongoose.set('debug', true);

    models(mongoose);

    mongoose.connection.on('error', function (err: Error): void {
        console.error('Mongoose connection: error - ' + err);
    });

    mongoose.connection.on('connected', function (): void {
        console.info('Mongoose connection: connected');
    });

    mongoose.connection.on('open', function (): void {
        console.info('Mongoose connection: open');
    });

    mongoose.connection.on('reconnected', function (): void {
        console.info('Mongoose connection: reconnected');
    });

    mongoose.connection.on('disconnected', function (): void {
        console.warn('Mongoose connection: disconnected');
    });

    process.on('SIGINT', function (): void {
        mongoose.disconnect(function () {
            process.exit(0);
        });
    });

    process.on('SIGINT', function () {
        mongoose.disconnect(function () {
            process.exit(0);
        });
    });

    return mongoose;
}

export default mongoConnection();
