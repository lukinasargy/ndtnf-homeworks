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
    private authService: AuthService,
  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('api/users/signUp')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async signUp(@Body() user) {
    return this.authService.signUp(user);
  }

  @Post('api/users/signIn')
  async signIn(@Body() user) {
    return this.authService.signIn(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/users/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
