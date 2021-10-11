import { Router } from 'express';
import createUserHandler from '../controllers/user';

const userRouter = Router();

// Register user
userRouter.post('/', createUserHandler);

export default userRouter;
