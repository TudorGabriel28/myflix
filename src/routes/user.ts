import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserHandler
} from '../controllers/user';

const userRouter = Router();

// Register user
userRouter.post('/', createUserHandler);

// Get all users
userRouter.get('/', getAllUsersHandler);

// Get user profile
userRouter.get('/:userId', getUserHandler);

export default userRouter;
