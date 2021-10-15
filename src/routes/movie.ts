import { Router } from 'express';
import createMovieHandler from '../controllers/movie';
import requiresUser from '../middlewares/requiresUser';

const movieRouter = Router();

movieRouter.post('/', [requiresUser], createMovieHandler);

export default movieRouter;
