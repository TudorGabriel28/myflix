import { omit } from 'lodash';
import { Request, Response } from 'express';
import { ReqQuery } from '../utils/types';
import {
  createUser,
  getAllUsers,
  findUser,
  editUser,
  deleteUser,
  activateAccount
} from '../services/user';
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

export async function getAllUsersHandler(
  req: Request<any, any, any, ReqQuery>,
  res: Response
) {
  try {
    const { filters, sort, sortOrder, limit, skip, search } = req.query;
    const users = await getAllUsers(
      filters,
      sort,
      sortOrder,
      limit,
      skip,
      search
    );
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

export async function deleteUserHandler(req: Request, res: Response) {
  try {
    // @ts-ignore
    const { _id, sessionId } = req.user;
    // @ts-ignore
    await deleteUser(_id, sessionId);
    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function activateAccountHandler(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const user = await activateAccount(userId);
    return res.status(201).send(omit(user, ['password']));
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
