import {
  Body,
  Controller,
  HttpException,
  Logger,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {AiToolService} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {CreateAiToolRequest} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool-proto';
import {ConfigService} from '@nestjs/config';

@Controller('ai-tool')
export default class AiToolController {
  private readonly LOG = new Logger(AiToolController.name);

  constructor(
    private aiToolService: AiToolService,
    private configService: ConfigService,
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateAiToolRequest,
    @Query('key-to-pass') keyToPass: string,
  ) {
    const adminAiToolCreationSecret = this.configService.get<string>(
      'ADMIN_AI_TOOL_CREATION_SECRET',
    );
    if (keyToPass !== adminAiToolCreationSecret) {
      throw new HttpException('You are not allowed to create AI Tool', 403);
    }
    return {
      message: 'create',
    };
  }
}
