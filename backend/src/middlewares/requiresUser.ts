import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../utils/types';

const requiresUser =
  (role: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = get(req, 'user');

    if (!user) {
      return res.sendStatus(401);
    }

    if (!role.includes(user.role)) {
      return res.sendStatus(403);
    }

    return next();
  };

export default requiresUser;
