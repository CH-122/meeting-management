import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisCleient: RedisClientType;

  async get(key: string) {
    return await this.redisCleient.get(key);
  }

  async set(key: string, value: string | number, ttl?: number) {
    if (ttl) {
      return await this.redisCleient.set(key, value, { EX: ttl });
    } else {
      return await this.redisCleient.set(key, value);
    }
  }
}
