import {UserEntity} from '@/bussiness/domains/user/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: UserEntity;
      admin?: AdminInAiTimesEntity;
    }
  }
}
