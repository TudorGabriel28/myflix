import express from 'express';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  res.status(200).send();
});

export default userRouter;
