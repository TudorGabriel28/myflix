import { LeanDocument } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/session';
import { UserDocument } from '../models/user';
import { sign } from '../utils/jwt';

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
