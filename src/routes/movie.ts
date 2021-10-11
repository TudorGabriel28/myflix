import { Router } from 'express';
import createMovieHandler from '../controllers/movie';

const movieRouter = Router();

movieRouter.post('/', createMovieHandler);

export default movieRouter;
