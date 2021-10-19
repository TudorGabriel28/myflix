import { Router } from 'express';
import {createMovieHandler, getMoviesHandler} from '../controllers/movie';
import requiresUser from '../middlewares/requiresUser';

const movieRouter = Router();

// Create a movie
movieRouter.post('/', [requiresUser], createMovieHandler);

// Get movies
movieRouter.get('/', [requiresUser], getMoviesHandler);

export default movieRouter;
