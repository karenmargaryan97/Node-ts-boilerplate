const limiter: any = {
    development: {
        delayMs: 0,
        max: 2500,
        windowsMs: 15 * 60 * 1000 // 15 minutes
    },
    production: {
        delayMs: 0,
        max: 100,
        windowsMs: 15 * 60 * 1000 // 15 minutes
    },
    test: {
        delayMs: 0,
        max: 100,
        windowsMs: 15 * 60 * 1000 // 15 minutes
    }
};
export default limiter[process.env.NODE_ENV || 'development'];
