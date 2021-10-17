import { FilterQuery, QueryOptions } from 'mongoose';
import ResetPasswordTokenModel, {
  ResetPasswordTokenDocument
} from '../models/reset.password.token';
import { UserDocument } from '../models/user';

export async function createResetPasswordToken(userId: UserDocument['_id']) {
  try {
    return await ResetPasswordTokenModel.create({ userId });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteResetPasswordToken(
  query: FilterQuery<ResetPasswordTokenDocument>,
  options: QueryOptions = {}
) {
  try {
    return await ResetPasswordTokenModel.findOneAndDelete(query, options);
  } catch (error: any) {
    throw new Error(error);
  }
}
