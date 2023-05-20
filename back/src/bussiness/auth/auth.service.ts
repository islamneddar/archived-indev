import {Injectable} from '@nestjs/common';
import {InjectEntityManager} from '@nestjs/typeorm';
import {UserService} from '@/bussiness/user/user.service';
import {EntityManager} from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private emailValidationService: EmailValidationService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const {password, ...result} = user;
        return result;
      }
    }
    return null;
  }

  async updatePassword(
    emailValidationEntity: EmailValidationEntity,
    newPassword: string,
  ) {
    await this.entityManager.transaction(async session => {
      const hashedPassword = await bcrypt.hash(
        newPassword,
        Number(process.env.SALT_ROUND),
      );
      this.LOG.debug(hashedPassword);
      this.LOG.debug(JSON.stringify(emailValidationEntity));
      this.userService.updatePasswordNotCommit(
        session,
        emailValidationEntity.user,
        hashedPassword,
      );
      this.emailValidationService.updateValidNotCommit(
        session,
        emailValidationEntity,
      );
    });
  }
}
