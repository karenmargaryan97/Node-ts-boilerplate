import { NextFunction, Request, Response } from 'express';
import { IJWTPayload } from '../../../interfaces/globals';
import { IUser } from '../../../interfaces/models';
import { INVALID_EMAIL_OR_PASSWORD } from '../../configs/constants';
import { SUCCESS_CODE } from '../../configs/status-codes';
import { BadRequest } from '../../errors';
import Utils from '../../helpers/utils';
import { UserService } from '../../services';

export class AuthController {

    public static async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const payload: IUser = req.body;

        try {
            payload.email = payload.email.toLowerCase();
            const user: IUser = await UserService.getByEmail(payload.email);

            if (!user || !user.comparePassword(payload.password)) {
                throw new BadRequest(INVALID_EMAIL_OR_PASSWORD);
            }

            const tokenInfo: IJWTPayload = Utils.signJWTToken(user);

            return res.status(SUCCESS_CODE).json({
                access_token: tokenInfo.token,
                user: {
                    _id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                },
            });
        } catch (err) {
            next(err);
        }
    }

    public static async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const payload: IUser = req.body;
        try {
            const user: IUser = await UserService.create(payload);

            const tokenInfo: IJWTPayload = Utils.signJWTToken(user);

            return res.status(SUCCESS_CODE)
                .json({
                    access_token: tokenInfo.token,
                    user: {
                        _id: user._id,
                        email: user.email,
                        fullName: user.fullName
                    }
                });
        } catch (e) {
            next(e);
        }
    }

    public static async logout(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            req.logout();

            return res.status(SUCCESS_CODE).json({
                success: true,
            });
        } catch (e) {
            next(e);
        }
    }

}
