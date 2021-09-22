import express from 'express';
import userRouter from '../routes/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
