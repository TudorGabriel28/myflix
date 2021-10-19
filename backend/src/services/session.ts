import { LeanDocument, FilterQuery, UpdateQuery } from 'mongoose';
import { get } from 'lodash';
import SessionModel, { SessionDocument } from '../models/session';
import { UserDocument } from '../models/user';
import { sign, decode } from '../utils/jwt';
import { findUser } from './user';

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
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
    { ...user, sessionId: session._id },
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

  const user = await findUser({ _id: session.user }, { password: 0 });
  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}
