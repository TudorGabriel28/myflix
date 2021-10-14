import { omit } from 'lodash';
import { Request, Response } from 'express';
import { createUser } from '../services/user';

export default async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (error: any) {
    console.log(error);
    return res.status(409).send(error.message);
  }
}
