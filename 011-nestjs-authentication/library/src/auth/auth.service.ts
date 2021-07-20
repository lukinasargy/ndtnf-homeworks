import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { GetUserDto } from 'src/users/dto/get-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    if (user) {
      if (user.password === pass) {
        return user;
      }
      return true;
    }
    return null;
  }

  async signIn(signInUser: GetUserDto) {
    const { email, password } = signInUser;
    const user = await this.validateUser(email, password);

    if (user) {
      if (user?.password) {
        const payload = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      } else {
        throw new BadRequestException('Wrong password');
      }
    } else {
      throw new BadRequestException('User not found');
    }
  }

  async signUp(createUser: CreateUserDto) {
    const { email, password } = createUser;
    const user = await this.validateUser(email, password);

    if (user) {
      throw new BadRequestException('User exists');
    } else {
      await this.usersService.createUser(createUser);
    }
  }
}
