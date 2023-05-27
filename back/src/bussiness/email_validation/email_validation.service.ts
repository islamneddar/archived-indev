import {Injectable} from '@nestjs/common';
import {EntityManager, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {EmailValidationEntity} from '@/bussiness/email_validation/email_valdation.entity';
import {UserEntity} from '@/bussiness/user/user.entity';
import {v4 as uuidv4} from 'uuid';
import {EmailValidationEnum} from '@/bussiness/email_validation/email_validation.types';

@Injectable()
export class EmailValidationService {
  constructor(
    @InjectRepository(EmailValidationEntity)
    private emailValidationRepository: Repository<EmailValidationEntity>,
  ) {}

  async getValidByCode(code: string) {
    return await this.emailValidationRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        valid: true,
        code: code,
      },
    });
  }

  async createNewCodeForResetPassword(user: UserEntity) {
    const emailValidator = new EmailValidationEntity();
    emailValidator.email = user.email;
    emailValidator.code = uuidv4();
    emailValidator.valid = true;
    emailValidator.type = EmailValidationEnum.PASSWORD_RESET;
    emailValidator.user = user;
    return await this.emailValidationRepository.save(emailValidator);
  }

  async updateValidNotCommit(
    session: EntityManager,
    emailValidationEntity: EmailValidationEntity,
  ) {
    emailValidationEntity.valid = false;
    await session.save(emailValidationEntity);
  }
}
