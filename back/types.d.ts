import {UserEntity} from '@/bussiness/user/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: UserEntity;
    }
  }
}
