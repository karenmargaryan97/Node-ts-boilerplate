import {
    apiPort,
    apiUrl,
    appUrl,
    tokenSecret
} from '../helpers/config';

const params: any = {
    development: {
        apiPort,
        apiUrl,
        appUrl,
        tokenSecret
    },
    production: {
        apiPort,
        apiUrl,
        appUrl,
        tokenSecret
    }
};

export default params[process.env.NODE_ENV || 'development'];
