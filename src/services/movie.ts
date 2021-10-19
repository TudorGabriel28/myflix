import MovieModel, { MovieDocument } from '../models/movie';

export async function createMovie(input: MovieDocument) {
  try {
    return await MovieModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getMovies(
  filters: string,
  sort: string,
  sortOrder: string | number,
  limit: number,
  skip: number,
  search?: string
) {
  try {
    const searchCriteria = {};

    if (search) {
      // @ts-ignore
      searchCriteria.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const filtersObj = JSON.parse(filters);

    return await MovieModel.find({ ...searchCriteria, ...filtersObj })
      .sort({ [sort]: sortOrder })
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
  } catch (error: any) {
    throw new Error(error);
  }
}
