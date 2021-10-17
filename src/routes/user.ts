import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserHandler,
  editUserHandler,
  deleteUserHandler,
  activateAccountHandler
} from '../controllers/user';

const userRouter = Router();

// Register user
userRouter.post('/', createUserHandler);

// Get all users
userRouter.get('/', getAllUsersHandler);

// Edit your profile
userRouter.put('/', editUserHandler);

// Delete user
userRouter.delete('/', deleteUserHandler);

// Get user profile
userRouter.get('/:userId', getUserHandler);

// Activate account
userRouter.get('/activate/:userId', activateAccountHandler);

export default userRouter;
