import { FilterQuery } from 'mongoose';
import { UserDocument } from '../models/user'
import mailer from '../utils/mailer'

export async function sendAccountActivationMail(email: FilterQuery<UserDocument>, id: FilterQuery<UserDocument>) {
  const mailContent = {
    from: process.env.MAILER_USER,
    to: email,
    subject: 'Account activation',
    text: `http://localhost:3000/users/activation/${id}`
  };

  await mailer(mailContent);
}

export async function sendResetPasswordMail(email: FilterQuery<UserDocument>, tokenId: FilterQuery<UserDocument>) {
  const mailContent = {
    from: process.env.MAILER_USER,
    to: email,
    subject: 'Reset password',
    text: `http://localhost:3000/users/reset-password/${tokenId}`
  };

  await mailer(mailContent);
}