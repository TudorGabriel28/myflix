/* eslint-disable */

import { Request, Response } from 'express';
import UserModel, { UserDocument } from '../models/user';

export default class UserController {
  async createUserHandler(req: Request, res: Response) {
    try {
      const user = await UserModel.create(req.body);
      return res.send({ user });
    } catch (error) {
      console.log(error);
    }
  }
}
