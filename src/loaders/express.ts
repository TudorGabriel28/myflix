import express from 'express';
import userRouter from '../routes/user';
import sessionRouter from '../routes/session';
import movieRouter from '../routes/movie';
import deserializeUser from '../middlewares/deserializeUser';

const app = express();

// middleware
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/movies', movieRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
