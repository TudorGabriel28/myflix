import { Router, Request, Response } from 'express';

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
  res.status(200).send();
});

export default userRouter;
