import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { JwtUserData } from 'src/login.guard';
import { Request } from 'express';
import { ModifyPasswordDto } from './dto/modify-password.dto';

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign_up')
  async signUp(@Body() createUserDto: CreateUserDto) {
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
    return await this.userService.login(loginUserDto);
  }

  /**
   * 管理端登录
   * @param loginUserDto
   * @returns
   */
  @Post('admin_login')
  async adminLogin(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto, true);
  }

  @Get('role_and_permission/:userid')
  async getRoleAndPermission(@Param('userid') userid: number) {
    return await this.userService.getRoleAndPermission(userid);
  }

  @Get('basic_info')
  @RequireLogin()
  async getBasicInfo(@Req() req: Request) {
    const user = req.user;

    return await this.userService.getBasicInfo(user.userid);
  }

  @Post('modify_password')
  @RequireLogin()
  async modifyPassword(
    @UserInfo('userid') userid: string,
    @Body() modifyPasswordDto: ModifyPasswordDto,
  ) {
    console.log(modifyPasswordDto);

    return await this.userService.modifyPassword(userid, modifyPasswordDto);
  }
  @Get('user_list')
  @RequireLogin()
  // @RequireAdmin()
  async getUserList(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.userService.getUserList(pageNumber, pageSize);
  }
}
