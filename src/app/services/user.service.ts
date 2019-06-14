import { IUser } from "../../interfaces/user";

import { Model, model } from "mongoose";
const User: Model<IUser> = model('User');

export class UserService {
    constructor() { }

    static async getByEmail(email: string): Promise<IUser> {
        return await User.findOne({ email });
    }

    static async create(user: IUser) : Promise<IUser> {
        const newUser: IUser = new User(user);

        newUser.password = newUser.generatePassword(user.password);

        return await User.create(newUser);
    }
}
