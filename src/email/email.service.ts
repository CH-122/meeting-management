import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: configService.get('nodemailer_server_host'),
      port: configService.get('nodemailer_server_port'),
      secure: true,
      auth: {
        user: configService.get('nodemailer_auth_username'),
        pass: configService.get('nodemailer_auth_pass'),
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: this.configService.get('nodemailer_auth_username'),
      },
      to,
      subject,
      html,
    });
  }
}
