import {Injectable} from '@nestjs/common';
import {UserEntity} from '@/bussiness/user/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {EntityManager, Repository} from 'typeorm';
import bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async createUser(params: {
    email: string;
    password: string;
    username: string;
  }) {
    const user = new UserEntity();
    user.email = params.email;
    user.password = await bcrypt.hash(
      params.password,
      Number(process.env.SALT_ROUND),
    );
    user.username = params.username;
    await this.userRepository.save(user);
  }

  updatePasswordNotCommit(
    session: EntityManager,
    user: UserEntity,
    hashedPassword: string,
  ) {
    user.password = hashedPassword;
    session.save(user);
  }

  findOneById(id: number) {
    return this.userRepository.findOne({
      where: {
        userId: id,
      },
    });
  }

  async findOneByIdAndEmail(param: {id: number; email: string}) {
    return this.userRepository.findOne({
      where: {
        userId: param.id,
        email: param.email,
      },
    });
  }
}
