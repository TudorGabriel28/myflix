import { Request, Response } from 'express';
import createMovie from '../services/movie';

export default async function createMovieHandler(req: Request, res: Response) {
  try {
    const movie = await createMovie(req.body);
    return res.status(201).send(movie);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
