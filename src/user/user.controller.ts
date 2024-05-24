import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    console.log(1);
  }

  @Post('sign_up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.userService.signUp(createUserDto);
  }

  @Post('send_captcha')
  async sendCaptcha(@Body('email') email: string) {
    return await this.userService.sendCaptcha(email);
  }

  /**
   * c 端登录
   * @param loginUserDto
   * @returns
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return await this.userService.login(loginUserDto);
  }

  /**
   * 管理端登录
   * @param loginUserDto
   * @returns
   */
  @Post('admin_login')
  async adminLogin(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return await this.userService.login(loginUserDto, true);
  }

  @Get('role_and_permission/:userid')
  async getRoleAndPermission(@Param('userid') userid: number) {
    console.log('userid', userid);

    return await this.userService.getRoleAndPermission(userid);
  }
}
