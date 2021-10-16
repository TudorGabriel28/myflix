import { Request, Response } from 'express';
import createResetPasswordToken from '../services/reset.password.token';
import { sendResetPasswordMail } from '../services/mailer';
import { findUser } from '../services/user';

export default async function createResetPasswordTokenHandler(
  req: Request,
  res: Response
) {
  try {
    const { email } = req.body;

    const user = await findUser({ email });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    // eslint-disable-next-line no-underscore-dangle
    const resetPasswordToken = await createResetPasswordToken(user._id);
    // eslint-disable-next-line no-underscore-dangle
    await sendResetPasswordMail(user, resetPasswordToken._id);

    return res.sendStatus(201);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
