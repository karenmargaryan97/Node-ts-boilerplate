import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import params from '../configs/params';
import { ObjectID } from 'bson';
import { IJWTSignPayload, IJWTPayload } from '../../interfaces/globals';
import { IUser } from '../../interfaces/user';

export default class Utils {
    static signJWTToken(user: IUser): IJWTPayload {
        const payload: IJWTSignPayload = { id: user._id, created_at: moment().toString() };

        const token: any = jwt.sign(payload, params.tokenSecret);

        return { token };
    }

    static verifyJWTToken(token: string, secret: string = params.tokenSecret): any {
        try {
            return jwt.verify(token, secret);
        } catch (e) {
            return null;
        }
    }

    static getObjectIds(query: string): Array<ObjectID> {
        const objectIds: string[] = query.split(',');

        return objectIds.map((fundId: string) => {
            return new ObjectID(fundId);
        });
    }
}
