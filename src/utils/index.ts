import * as crypto from 'crypto';

export function md5(val: string) {
  const hash = crypto.createHash('md5');
  hash.update(val);
  return hash.digest('hex');
}
