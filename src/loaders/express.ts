import express from 'express';
import userRouter from '../routes/user';
import sessionRouter from '../routes/session';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/sessions', sessionRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
