import {Injectable, Logger} from '@nestjs/common';
import {InjectEntityManager} from '@nestjs/typeorm';
import {UserService} from '@/bussiness/domains/user/user.service';
import {EntityManager} from 'typeorm';
import bcrypt from 'bcrypt';
import {EmailValidationService} from '@/bussiness/email_validation/email_validation.service';
import {EmailValidationEntity} from '@/bussiness/email_validation/email_valdation.entity';
import {InAiTimesAdminService} from '@/bussiness/inaitimer-admin/inaitmes-admin.service';

@Injectable()
export class AuthService {
  private readonly LOG = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly adminService: InAiTimesAdminService,
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

  async validateAdmin(email: string, password: string) {
    const user = await this.adminService.findOneByEmail(email);
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
      this.userService.updatePasswordNotCommit(
        session,
        emailValidationEntity.user,
        hashedPassword,
      );
      await this.emailValidationService.updateValidNotCommit(
        session,
        emailValidationEntity,
      );
    });
  }
}
