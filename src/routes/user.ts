import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserHandler,
  editUserHandler
} from '../controllers/user';

const userRouter = Router();

// Register user
userRouter.post('/', createUserHandler);

// Get all users
userRouter.get('/', getAllUsersHandler);

// Edit your profile
userRouter.put('/', editUserHandler);

// Get user profile
userRouter.get('/:userId', getUserHandler);

export default userRouter;
