import UserModel, { UserDocument } from '../models/user';

export default class UserService {
  userModel;

  constructor() {
    this.userModel = UserModel;
  }

  async createUser(input: UserDocument) {
    try {
      return await this.userModel.create(input);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
