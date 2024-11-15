import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import {Request} from 'express';
import {JwtService} from '@nestjs/jwt';
import {InAiTimesAdminService} from '@/bussiness/inaitimer-admin/inaitmes-admin.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  LOG = new Logger(AuthAdminGuard.name);

  constructor(
    private jwtService: JwtService,
    private inAiTimesAdminService: InAiTimesAdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('unauthorized');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // TODO get user from db and attach to request
      const admin = await this.inAiTimesAdminService.findOneByIdAndEmail({
        id: payload.id,
        email: payload.email,
      });
      if (!admin) {
        throw new UnauthorizedException('unauthorized');
      }
      request.admin = admin;
    } catch (e) {
      throw new UnauthorizedException('unauthorized');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
