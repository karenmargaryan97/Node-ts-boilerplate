import params from './params';

const corsOptions: any = {
    development: {
        allowedHeaders: [
            'Content-Type',
            'Authorization'
        ],
        credentials: true,
        origin: /localhost:3000/
    },
    production: {
        allowedHeaders: [
            'Content-Type',
            'Authorization'
        ],
        credentials: true,
        origin: params.corsOrigins
    }
};

export default corsOptions[process.env.NODE_ENV || 'development'];
