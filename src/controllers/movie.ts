import { Request, Response } from 'express';
import {createMovie, getMovies} from '../services/movie';

export async function createMovieHandler(req: Request, res: Response) {
  try {
    const movie = await createMovie(req.body);
    return res.status(201).send(movie);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function getMoviesHandler(req: Request, res: Response) {
  try {
    const movies = await getMovies();
    return res.status(200).send(movies);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}



