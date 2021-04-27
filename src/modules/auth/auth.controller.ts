import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { Class, Handler } from 'src/common/decorators/controller.decorator';
import { LocalAuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@Class({ tag: '认证', isAuth: false })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Handler({ tag: '用户登录' })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() dto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Get('/profile')
  @Handler({ tag: '获取用户信息', isAuth: true })
  getProfile(@Request() req) {
    return req.user;
  }
}
