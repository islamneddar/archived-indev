import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmailValidationEntity} from '@/bussiness/email_validation/email_valdation.entity';
import {EmailValidationService} from '@/bussiness/email_validation/email_validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailValidationEntity])],
  providers: [EmailValidationService],
  exports: [EmailValidationService],
})
export class EmailValidationModule {}
