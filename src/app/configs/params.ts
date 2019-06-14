import {
    apiUrl,
    appUrl,
    apiPort,
    tokenSecret
} from '../helpers/config';

const params: any = {
    development: {
        apiUrl,
        appUrl,
        apiPort,
        tokenSecret
    },
    production: {
        apiUrl,
        appUrl,
        apiPort,
        tokenSecret
    }
};

export default params[process.env.NODE_ENV || 'development'];
