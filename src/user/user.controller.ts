import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign_up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.userService.signUp(createUserDto);
  }

  @Post('send_captcha')
  async sendCaptcha(@Body('email') email: string) {
    return await this.userService.sendCaptcha(email);
  }
}
