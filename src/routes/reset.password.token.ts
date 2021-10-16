import { Router } from 'express';
import createResetPasswordTokenHandler from '../controllers/reset.password.token';

const resetPasswordTokenRouter = Router();

// Create reset password token
resetPasswordTokenRouter.post('/', createResetPasswordTokenHandler);

export default resetPasswordTokenRouter;
