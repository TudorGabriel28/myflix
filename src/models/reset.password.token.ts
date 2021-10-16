import mongoose from 'mongoose';
import { UserDocument } from './user';

export interface ResetPasswordTokenDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  expireAt: Date;
}

const resetPasswordTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '7h' }
  }
});

const ResetPasswordTokenModel = mongoose.model<ResetPasswordTokenDocument>(
  'ResetPasswordToken',
  resetPasswordTokenSchema
);

export default ResetPasswordTokenModel;
