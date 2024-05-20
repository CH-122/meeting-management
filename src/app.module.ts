import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '990309',
      database: 'metting_reservation',
      synchronize: false,
      logging: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      poolSize: 10,
      connectorPackage: 'mysql2',
    }),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
