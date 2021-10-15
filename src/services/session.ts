import { LeanDocument } from 'mongoose';
import { get } from 'lodash';
import SessionModel, { SessionDocument } from '../models/session';
import { UserDocument } from '../models/user';
import { sign, decode } from '../utils/jwt';
import { findUser } from './user';

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session
}: {
  user:
    | Omit<UserDocument, 'password'>
    | LeanDocument<Omit<UserDocument, 'password'>>;
  session:
    | Omit<SessionDocument, 'password'>
    | LeanDocument<Omit<SessionDocument, 'password'>>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    // eslint-disable-next-line no-underscore-dangle
    { ...user, session: session._id },
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, '_id')) return false;

  // Get the session
  const session = await SessionModel.findById(get(decoded, '_id'));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}
