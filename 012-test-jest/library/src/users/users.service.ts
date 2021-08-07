import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  
  public createUser(user: CreateUserDto) {
    const newUser = new this.UserModel(user);
    return newUser.save();
  }

  async getUser(email: string): Promise<User | undefined> {
    return this.UserModel.findOne({email}).exec();
  }
}
