import MovieModel, { MovieDocument } from '../models/movie';

export default async function createMovie(input: MovieDocument) {
  try {
    return await MovieModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}
