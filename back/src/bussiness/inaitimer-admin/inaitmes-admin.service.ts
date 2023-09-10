import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {AdminInAiTimesEntity} from '@/bussiness/inaitimer-admin/inaitimer-admin.entity';
import {Repository} from 'typeorm';
import {AdminRoleEnum} from '@/bussiness/inaitimer-admin/inaitimes-admin.proto';
import bcrypt from 'bcrypt';
@Injectable()
export class InAiTimesAdminService {
  constructor(
    @InjectRepository(AdminInAiTimesEntity)
    private adminInAiTimesRepository: Repository<AdminInAiTimesEntity>,
  ) {}

  async findOneByIdAndEmail(param: {id: number; email: string}) {
    return this.adminInAiTimesRepository.findOne({
      where: {
        id: param.id,
        email: param.email,
      },
    });
  }

  async findOneByEmail(
    email: string,
  ): Promise<AdminInAiTimesEntity | undefined> {
    return this.adminInAiTimesRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async createUser(params: {
    email: string;
    password: string;
    username: string;
    role: AdminRoleEnum;
  }) {
    const admin = new AdminInAiTimesEntity();
    admin.email = params.email;
    admin.password = await bcrypt.hash(
      params.password,
      Number(process.env.SALT_ROUND),
    );
    admin.username = params.username;
    admin.role = params.role;
    await this.adminInAiTimesRepository.save(admin);
  }
}
