import { Request, Response } from 'express';
import { get } from 'lodash';
import { validatePassword } from '../services/user';
import {
  createSession,
  createAccessToken,
  updateSession,
  findSessions
} from '../services/session';
import { sign } from '../utils/jwt';

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  // Create a session
  const session = await createSession(
    // eslint-disable-next-line no-underscore-dangle
    user._id,
    req.get('user-agent') || ''
  );

  // Create access token
  const accessToken = createAccessToken({
    user,
    session
  });

  // Create refresh token
  const refreshToken = sign(session, {
    expiresIn: process.env.REFRESH_TOKEN_TTL
  });

  // send refresh & access token back
  return res.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  try {
    const sessionId = get(req, 'user.session');

    await updateSession({ _id: sessionId }, { valid: false });

    return res.sendStatus(200);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  try {
    const userId = get(req, 'user._id');

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
