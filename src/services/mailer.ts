import { UserDocument } from '../models/user';
import mailer from '../utils/mailer';

require('dotenv').config();

export async function sendAccountActivationMail(user: UserDocument) {
  const mailContent = {
    from: process.env.MAILER_USER,
    to: user.email,
    subject: 'Account activation',
    // eslint-disable-next-line no-underscore-dangle
    text: `http://localhost:3000/api/users/activate/${user._id}`
  };

  await mailer(mailContent);
}

export async function sendResetPasswordMail(
  user: UserDocument,
  tokenId: string
) {
  const mailContent = {
    from: process.env.MAILER_USER,
    to: user.email,
    subject: 'Reset password',
    text: `http://localhost:3000/users/reset-password/${tokenId}`
  };

  await mailer(mailContent);
}
