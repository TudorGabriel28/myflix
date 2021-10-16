import ResetPasswordTokenModel from '../models/reset.password.token';
import { UserDocument } from '../models/user';

export default async function createResetPasswordToken(
  userId: UserDocument['_id']
) {
  try {
    return await ResetPasswordTokenModel.create({ userId });
  } catch (error: any) {
    throw new Error(error);
  }
}
