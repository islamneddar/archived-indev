import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  Req,
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
  ValidateAiToolBody,
} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool-proto';
import {ConfigService} from '@nestjs/config';
import {S3AppService} from '@/external-services/aws-s3/s3-app.service';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import {slugify} from '@/utils/common.util';
import {AuthAdminGuard} from '@/bussiness/auth/auth-admin.guard';
import {Request} from 'express';
import {ScreenshotService} from '@/external-services/screenshot-service/screenshot.service';
import LOG from '@/utils/logger';

@Controller('ai-tool')
export default class AiToolController {
  constructor(
    private aiToolService: AiToolService,
    private configService: ConfigService,
    private s3AppService: S3AppService,
    private screenShotService: ScreenshotService,
  ) {}

  @Post('create')
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateAiToolRequest,
    @Query('key-to-pass') keyToPass: string,
    @Req() req: Request,
  ) {
    const admin = req.admin;

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
    let imageUploadedUrl: string;

    try {
      if (!image) {
        const screenShot = await this.screenShotService.getScreenShot(
          body.url.toString(),
        );
        imageUploadedUrl = await this.s3AppService.uploadFileFromBuffer(
          screenShot,
          'public-read',
          'ai-tool',
          `${Date.now()}-${body.name}.png`,
        );
      } else {
        imageUploadedUrl = await this.s3AppService.uploadFile(
          image,
          'public-read',
          'ai-tool',
        );
      }
    } catch (e) {
      LOG.error(e);
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
    aiTool.admin = admin;

    await this.aiToolService.create(aiTool);

    return {
      message: aiTool,
    };
  }

  @Get('list')
  async list(@Query() query: GetAllAiToolsQuery) {
    return await this.aiToolService.findAll({
      pageOption: query.pageOption,
      category: query.category,
      pricing: query.pricing,
      searchText: query.searchText,
    });
  }

  /*
    This endpoint is used by admin to list all AI Tools that are not validated yet
   */
  @UseGuards(AuthAdminGuard)
  @Get('/list/not_validated')
  async listNotValidated(@Query() query: GetAllAiToolNotValidatedQuery) {
    return await this.aiToolService.findAllNotValidated(query.page);
  }

  @UseGuards(AuthAdminGuard)
  @Post('/admin/validate')
  async validate(@Body() body: ValidateAiToolBody) {
    const aiTool = await this.aiToolService.findById(body.aiToolId);
    if (!aiTool) {
      throw new HttpException('AI Tool not found', 404);
    }

    await this.aiToolService.validate(body.aiToolId);
    return {
      message: 'AI Tool validated',
      id: body.aiToolId,
    };
  }
}
