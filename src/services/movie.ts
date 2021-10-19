import MovieModel, { MovieDocument } from '../models/movie';

export async function createMovie(input: MovieDocument) {
  try {
    return await MovieModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getMovies() {
  try {
    return await MovieModel.find();
  } catch (error: any) {
    throw new Error(error);
  }
}
