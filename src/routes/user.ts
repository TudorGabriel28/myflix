import { Router, Request, Response } from 'express';

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
  res.status(200).send();
});

userRouter.post('/', userController.createUserHandler);

export default userRouter;
