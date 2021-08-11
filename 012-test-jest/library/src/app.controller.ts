import { AuthService } from './auth/auth.service';
import { Controller, Get, Request, Post, UseGuards, Body, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AppService } from './app.service';
import { JoiValidationPipe } from './common/pipes/joi-validation.pipe';
import { createUserSchema } from './common/joi/create-user.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/users/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
