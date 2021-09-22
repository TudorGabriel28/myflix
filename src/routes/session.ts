import { Router } from 'express';
import { createUserSessionHandler } from '../controllers/session';

const sessionRouter = Router();

// Login user
sessionRouter.post('/', createUserSessionHandler);

export default sessionRouter;
