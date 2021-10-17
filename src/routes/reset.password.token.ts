import { Router } from 'express';
import {
  createResetPasswordTokenHandler,
  updatePasswordHandler
} from '../controllers/reset.password.token';

const resetPasswordTokenRouter = Router();

// Create reset password token
resetPasswordTokenRouter.post('/', createResetPasswordTokenHandler);

// Update password and delete token
resetPasswordTokenRouter.put('/:tokenId', updatePasswordHandler);
export default resetPasswordTokenRouter;
