import { Request, Response } from 'express';
import { createUser, getAllUsers, findUser, editUser } from '../services/user';
import { sendAccountActivationMail } from '../services/mailer';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    await sendAccountActivationMail(user);
    return res.sendStatus(201);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function getAllUsersHandler(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    if (!users) {
      return res.sendStatus(404);
    }
    return res.status(200).send(users);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const user = await findUser({ _id: userId });
    if (!user) {
      return res.sendStatus(404);
    }
    return res.status(200).send(omit(user, 'password'));
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function editUserHandler(req: Request, res: Response) {
  try {
    // @ts-ignore
    const { _id } = req.user;
    const user = await editUser({ _id }, req.body);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.status(200).send(omit(user, 'password'));
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
