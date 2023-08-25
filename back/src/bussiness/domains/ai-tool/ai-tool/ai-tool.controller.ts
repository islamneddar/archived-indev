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
import {S3AppService} from '@/external-services/aws-s3/s3-app.service';

@Controller('ai-tool')
export default class AiToolController {
  private readonly LOG = new Logger(AiToolController.name);

  constructor(
    private aiToolService: AiToolService,
    private configService: ConfigService,
    private s3AppService: S3AppService,
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
    let imageUploadedUrl;
    try {
      imageUploadedUrl = await this.s3AppService.uploadFile(
        image,
        'public-read',
        'ai-tool',
      );
    } catch (e) {
      this.LOG.error(e);
      throw new HttpException('Error while uploading image', 500);
    }

    // put imageUploadedUrl to database with other data from body

    return {
      message: 'create',
    };
  }
}
