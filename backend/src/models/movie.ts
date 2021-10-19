import mongoose from 'mongoose';

export interface MovieDocument extends mongoose.Document {
  title: String;
  author: String;
  platform?: String;
  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    platform: { type: String }
  },
  { timestamps: true }
);

const MovieModel = mongoose.model<MovieDocument>('Movie', MovieSchema);

export default MovieModel;
