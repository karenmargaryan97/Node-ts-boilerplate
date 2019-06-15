import { IUser } from '../../interfaces/models';

import * as mongoose from 'mongoose';
const User: Model<IUser> = mongoose.model('User');

import { NOT_EXISTS } from '../configs/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthError } from '../errors';
import { Model } from 'mongoose';

export default (secret: string, passport: any) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        let user: IUser = await User.findById(id);

        user ? done(null, user) : done(new AuthError(NOT_EXISTS('User')), null);
    });

    let jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };

    let strategy: Strategy = new Strategy (jwtOptions, async (payload: IUser, next: any) => {
        let user: IUser = await User.findById(payload.id);

        if (user) {
            next(null, user);
        } else {
            next(new AuthError(NOT_EXISTS('User')), false);
        }
    });
    passport.use('user-rule', strategy);
};
