import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from 'src/utils';
import { User } from './entities/user.entity';
import { EmailService } from 'src/email/email.service';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger();

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Inject(EmailService)
  private readonly emailService: EmailService;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  async signUp(user: CreateUserDto) {
    console.log(user);

    const captcha = await this.redisService.get(`captcha_${user.email}`);

    console.log(`captcha_${user.email}`);

    if (!captcha) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }

    if (user.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foudUser = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (foudUser) {
      await this.redisService.delete(`captcha_${user.email}`);
      throw new HttpException('邮箱已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.nickName = user.nickName;
    newUser.password = md5(user.password);
    newUser.email = user.email;
    newUser.createTime = Date.now();
    newUser.updateTime = Date.now();

    try {
      await this.userRepository.save(newUser);
      await this.redisService.delete(`captcha_${user.email}`);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);

      await this.redisService.delete(`captcha_${user.email}`);
      return '注册失败';
    }
  }

  async sendCaptcha(email: string) {
    this.logger.log(`send captcha to ${email}`);
    if (email) {
      const captcha = Math.random().toString().slice(2, 8);
      this.redisService.set(`captcha_${email}`, captcha, 600);

      try {
        await this.emailService.sendMail({
          to: email,
          subject: '会议室预约系统注册验证码',
          html: `<h1>验证码：${captcha}，有效期为 10 分钟</h1>`,
        });
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }

      return '验证码发送成功，请注意查收' + captcha;
    } else {
      throw new HttpException('邮箱不能为空', HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginUserDto: LoginUserDto, isAdmin: boolean = false) {
    const user = await this.userRepository.findOneBy({
      username: loginUserDto.username,
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== md5(loginUserDto.password)) {
      throw new HttpException('密码不正确', HttpStatus.BAD_REQUEST);
    }

    if (user.isFrozen) {
      throw new HttpException('用户已被冻结', HttpStatus.BAD_REQUEST);
    }

    if (isAdmin) {
      if (!user.isAdmin) {
        throw new HttpException('用户不是管理员', HttpStatus.BAD_REQUEST);
      }
    }

    return '登录成功';
  }
}
