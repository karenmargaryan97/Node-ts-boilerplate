import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services';
import { SUCCESS_CODE } from '../../configs/status-codes';
import { BadRequest } from '../../errors';
import Utils from '../../helpers/utils';
import { INVALID_EMAIL_OR_PASSWORD } from '../../configs/constants';
import { IJWTPayload } from '../../../interfaces/globals';
import { IUser } from '../../../interfaces/user';

export class AuthController {

    static async login(req: Request, res: Response, next: NextFunction) {
        let payload: IUser = req.body;

        try {
            payload.email = payload.email.toLowerCase();
            let user: IUser = await UserService.getByEmail(payload.email);

            if (user === null || !user.comparePassword(payload.password)) {
                throw new BadRequest(INVALID_EMAIL_OR_PASSWORD);
            }

            const tokenInfo: IJWTPayload = Utils.signJWTToken(user);

            return res.status(SUCCESS_CODE)
                .json({
                    access_token: tokenInfo.token,
                    user: {
                        _id: user._id,
                        fullName: user.fullName,
                        email: user.email
                    }
                });
        } catch (err) {
            next(err);
        }
    }

    static async register(req: Request, res: Response, next: NextFunction) {
        const payload: IUser = req.body;
        try {
            const user: IUser = await UserService.create(payload);

            const tokenInfo: IJWTPayload = Utils.signJWTToken(user);

            return res.status(SUCCESS_CODE)
                .json({
                    access_token: tokenInfo.token,
                    user: {
                        _id: user._id,
                        fullName: user.fullName,
                        email: user.email
                    }
                });
        } catch (e) {
            next(e);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            req.logout();

            return res.status(SUCCESS_CODE).json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    }

}
