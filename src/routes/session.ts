import { Router } from 'express';
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler
} from '../controllers/session';

const sessionRouter = Router();

// Login user
sessionRouter.post('/', createUserSessionHandler);

// Logout user
sessionRouter.delete('/', invalidateUserSessionHandler);

// Get the user's sessions
sessionRouter.get('/', getUserSessionsHandler);

export default sessionRouter;
