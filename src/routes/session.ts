import { Router } from 'express';
import {
  createUserSessionHandler,
  invalidateUserSessionHandler
} from '../controllers/session';

const sessionRouter = Router();

// Login user
sessionRouter.post('/', createUserSessionHandler);

// Logout user
sessionRouter.delete('/', invalidateUserSessionHandler);

export default sessionRouter;
