import { FilterQuery, UpdateQuery } from 'mongoose';
import { omit } from 'lodash';
import UserModel, { UserDocument } from '../models/user';
import { updateSession } from './session';
import { SessionDocument } from '../models/session';

export async function createUser(input: UserDocument) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword({
  email,
  password
}: {
  email: UserDocument['email'];
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
}

export async function findUser(
  query: FilterQuery<UserDocument>,
  projection: Object = {},
  options: Object = {}
) {
  return UserModel.findOne(query, projection, options).lean();
}

export async function getAllUsers() {
  try {
    return await UserModel.find({}, { password: 0 }).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function editUser(
  query: FilterQuery<UserDocument>,
  updates: UpdateQuery<UserDocument>
) {
  try {
    return await UserModel.findOneAndUpdate(query, updates, {
      new: true
    }).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteUser(
  query: FilterQuery<UserDocument>,
  sessionId: FilterQuery<SessionDocument>
) {
  try {
    await UserModel.deleteOne({ query });
    await updateSession({ _id: sessionId }, { valid: false });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function activateAccount(userId: string) {
  try {
    return await UserModel.findOneAndUpdate(
      { _id: userId },
      { valid: true },
      { new: true }
    ).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}
