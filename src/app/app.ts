import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as RateLimit from 'express-rate-limit';
import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

import corsOptions from './configs/cors';
import configPassport from './strategies/passport-jwt';
import errorHandler from './middlewares/errorHandler';
import params from './configs/params';
import limiter from './configs/limiter';
import enableModules from './modules';


class Application {
    public app: express.Application;
    public router: express.Router;

    constructor() {
        this.app = express();
        this.initApp();
    }

    private initApp(): void {
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
            // .use(expressValidator())
            .use(json())
            .use(urlencoded({ extended: true }))
            .use(cookieParser())
            .use(Application.createLimiter())
            .use(helmet());
    }

    private configPassport(): void {
        configPassport(params.tokenSecret, passport);
        this.app.use(passport.initialize())
            .use(passport.session());
    }

    private static createLimiter(): any {
        return new RateLimit(limiter);
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

export default () => new Application().app;
