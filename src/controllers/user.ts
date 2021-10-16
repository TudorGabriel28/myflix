import { Request, Response } from 'express';
import { createUser } from '../services/user';
import { sendAccountActivationMail } from '../services/mailer';

export default async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    await sendAccountActivationMail(user);
    return res.sendStatus(201);
  } catch (error: any) {
    console.log(error);
    return res.status(409).send(error.message);
  }
}
