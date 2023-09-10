import {Controller} from '@nestjs/common';
import {InAiTimesAdminService} from '@/bussiness/inaitimer-admin/inaitmes-admin.service';

@Controller('inaitimes/admin')
export class InAiTimesAdminController {
  constructor(private readonly inaitimesAdminService: InAiTimesAdminService) {}
}
