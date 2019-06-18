import { IUser } from '../../interfaces/models';
import { Model, model, Schema } from 'mongoose';

const User: Model<IUser> = model('User');

import { NOT_EXISTS } from '../configs/constants';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AuthError } from '../errors';

export default (secret: string, passport: any): void => {
    passport.serializeUser((user: IUser, done: any): void => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string | Schema.Types.ObjectId, done: any): Promise<any> => {
        const user: IUser = await User.findById(id);

        user ? done(null, user) : done(new AuthError(NOT_EXISTS('User')), null);
    });

    const jwtOptions: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };

    const strategy: Strategy = new Strategy (jwtOptions, async (payload: IUser, next: any): Promise<void> => {
        const user: IUser = await User.findById(payload.id);

        if (user) {
            next(null, user);
        } else {
            next(new AuthError(NOT_EXISTS('User')), false);
        }
    });

    passport.use('user-rule', strategy);
};
