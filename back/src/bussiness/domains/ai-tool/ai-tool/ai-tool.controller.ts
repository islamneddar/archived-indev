import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {AiToolService} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {
  CreateAiToolRequest,
  GetAllAiToolNotValidatedQuery,
  GetAllAiToolsQuery,
} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool-proto';
import {ConfigService} from '@nestjs/config';
import {S3AppService} from '@/external-services/aws-s3/s3-app.service';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import {slugify} from '@/utils/common.util';
import {AuthAdminGuard} from '@/bussiness/auth/auth-admin.guard';

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

    const aiToolExist = await this.aiToolService.findOneBySlugAndWebsite(
      slugify(body.name),
      body.url.toString(),
    );

    if (aiToolExist) {
      throw new HttpException('AI Tool already exist', 400);
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

    const aiTool = new AiToolEntity();
    aiTool.name = body.name;
    aiTool.slug = slugify(body.name);
    aiTool.description = body.description;
    aiTool.url = body.url.toString();
    aiTool.image = imageUploadedUrl;
    aiTool.category = body.category;
    aiTool.pricing = body.pricing;

    await this.aiToolService.create(aiTool);

    return {
      message: aiTool,
    };
  }

  @Get('list')
  async list(@Query() query: GetAllAiToolsQuery) {
    this.LOG.log(query.isAll);
    if (query.isAll) {
      return await this.aiToolService.findAll({
        pageOption: query.pageOption,
      });
    }

    return await this.aiToolService.findAllByCategory({
      pageOption: query.pageOption,
      category: query.category,
    });
  }

  @UseGuards(AuthAdminGuard)
  @Get('/list/not_validated')
  async listNotValidated(@Query() query: GetAllAiToolNotValidatedQuery) {
    return await this.aiToolService.findAllNotValidated(query.page);
  }
}
