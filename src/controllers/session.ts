import { Request, Response } from 'express';
import { validatePassword } from '../services/user';
import { createSession, createAccessToken } from '../services/session';
import { sign } from '../utils/jwt';

export default async function createUserSessionHandler(
  req: Request,
  res: Response
) {
  // validate the email and password
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

  // create access token
  const accessToken = createAccessToken({
    user,
    session
  });

  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: process.env.REFRESH_TOKEN_TTL
  });

  // send refresh & access token back
  return res.send({ accessToken, refreshToken });
}
