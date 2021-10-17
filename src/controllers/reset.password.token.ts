import { Request, Response } from 'express';
import {
  createResetPasswordToken,
  deleteResetPasswordToken
} from '../services/reset.password.token';
import { sendResetPasswordMail } from '../services/mailer';
import { findUser, updatePassword } from '../services/user';

export async function createResetPasswordTokenHandler(
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
    return res.status(400).send(error.message);
  }
}

export async function updatePasswordHandler(req: Request, res: Response) {
  try {
    const { tokenId } = req.params;
    const { password, passwordConfirmation } = req.body;
    if (password !== passwordConfirmation) {
      return res.status(400).send('Passwords are not the same.');
    }

    // Delete reset password token
    const token = await deleteResetPasswordToken({ _id: tokenId });
    if (!token) {
      return res.status(400).send('Link has expired.');
    }

    // Update password
    await updatePassword({ _id: token.userId }, password);

    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
