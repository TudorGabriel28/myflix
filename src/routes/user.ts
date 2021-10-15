import { Router } from 'express';
import { createUserHandler, getAllUsersHandler } from '../controllers/user';

const userRouter = Router();

// Register user
userRouter.post('/', createUserHandler);

// Get all users
userRouter.get('/', getAllUsersHandler);

export default userRouter;
