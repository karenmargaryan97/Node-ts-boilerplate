import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as RateLimit from 'express-rate-limit';
import * as expressValidator from 'express-validator';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as passport from 'passport';

import corsOptions from './configs/cors';
import limiter from './configs/limiter';
import params from './configs/params';
import errorHandler from './middlewares/errorHandler';
import enableModules from './modules';
import configPassport from './strategies/passport-jwt';
import { isValidDate } from './validators';

class Application {
    public app: express.Application;
    public router: express.Router;
    private limiter: express.RequestHandler;

    constructor() {
        this.app = express();
        this.initApp();
    }

    private initApp(): void {
        this.createLimiter();
        this.configApp();
        this.configPassport();
        this.setParams();
        this.setRouter();
        this.setErrorHandler();
        this.enableModules();
    }

    private configApp(): void {
        if (this.app.get('env') !== 'production') {
            this.app.use(logger('dev'));
        }

        this.app.use(cors(corsOptions))
            .use(expressValidator({
                customValidators: {
                    isValidDate
                }
            }))
            .use(json({ limit: 52428800 }))
            .use(urlencoded({ extended: true, parameterLimit: 52428800, limit: 52428800 }))
            .use(cookieParser())
            .use(this.limiter)
            .use(helmet());
    }

    private configPassport(): void {
        configPassport(params.tokenSecret, passport);
        this.app.use(passport.initialize())
            .use(passport.session());
    }

    private createLimiter(): void {
        this.limiter = new RateLimit(limiter);
    }

    private setParams(): void {
        this.app.set('json spaces', 4);
    }

    private setRouter(): void {
        this.router = express.Router();
        this.app.use(`/api`, this.router);
    }

    private setErrorHandler(): void {
        this.app.use(errorHandler);
    }

    private enableModules(): void {
        enableModules(this.router);
    }
}

export default (): any => new Application().app;
