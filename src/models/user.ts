import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

let saltRounds: number;

if (process.env.SALT_ROUNDS) {
  saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
} else {
  throw new Error('SALT_ROUNDS is not set');
}

interface UserDocument extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  active?: boolean;
  role?: 'viewer' | 'admin' | 'superUser';
  createdAt: Date;
  updatedAt: Date;
  // eslint-disable-next-line no-unused-vars
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(v: string) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: 'Please enter a valid email address'
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(v: string) {
          return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%_*?&]).{8,}$/.test(
            v
          );
        },
        message:
          'Your password must have one lowercase, one uppercase, one number and one special character'
      }
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    nickname: {
      type: String,
      trim: true
    },
    active: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'viewer'
    }
    // friends: [{ type: Schema.Types.ObjectId, ref: 'Friends' }]
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function comparePassword(
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

userSchema.pre('save', async function hashPassword(next) {
  const user = this as UserDocument;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }

  next();
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
