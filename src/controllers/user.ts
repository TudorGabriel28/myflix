import { Request, Response } from 'express';
import { createUser, getAllUsers } from '../services/user';
import { sendAccountActivationMail } from '../services/mailer';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    await sendAccountActivationMail(user);
    return res.sendStatus(201);
  } catch (error: any) {
    console.log(error);
    return res.status(409).send(error.message);
  }
}

export async function getAllUsersHandler(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(error.message);
  }
}
