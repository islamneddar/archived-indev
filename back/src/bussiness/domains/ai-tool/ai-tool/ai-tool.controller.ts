import {
  Body,
  Controller,
  Delete,
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
    const imageUploadedUrl: string = await this.generateImageFromUrl(
      image,
      body.url,
      body.name,
    );

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
  @Get('/admin/list/not_confirmed_by_admin')
  async listNotFeatured(@Query() query: GetAllAiToolNotValidatedQuery) {
    return await this.aiToolService.findAllNotConfirmedByAdmin(query.page);
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

  @UseGuards(AuthAdminGuard)
  @Post('/admin/confirm')
  async confirm(@Body() body: ValidateAiToolBody) {
    const aiTool = await this.aiToolService.findById(body.aiToolId);
    if (!aiTool) {
      throw new HttpException('AI Tool not found', 404);
    }

    await this.aiToolService.confirmByAdmin(body.aiToolId);
    return {
      message: 'AI Tool confirmed',
      id: body.aiToolId,
    };
  }

  /*  @UseGuards(AuthAdminGuard)
  @Get('/admin/add_new_group_list_tool_guru_v2')
  async addNewGroupListToolGuruV2(@Req() req: Request) {
    const admin = req.admin;

    const promiseAddListAi = new Promise(async resolve => {
      for (const aiToolExternal of listAIToolsWithCategory) {
        const category = await this.aiToolCategoryService.findByType(
          aiToolExternal.type,
        );
        if (!category) {
          throw new HttpException('Category not found', 404);
        }

        const listAiToolsFromAiToolGuru = aiToolExternal.tools;

        let count = 0;
        const listAiToolNotAdded = [];
        for (const aiTool of listAiToolsFromAiToolGuru) {
          console.log(
            `start to add ai tool ${aiTool.title} => ${count++}/${
              listAiToolsFromAiToolGuru.length
            }`,
          );
          const aiToolExist = await this.aiToolService.findOneBySlugAndWebsite(
            slugify(aiTool.title),
            aiTool.url.toString(),
          );

          if (aiToolExist) {
            console.log(`ai tool ${aiTool.title} already exist`);
          }

          const tags = aiTool.tags;

          try {
            const imageUploadedUrl: string = await this.generateImageFromUrl(
              null,
              new URL(aiTool.website),
              aiTool.title,
            );

            const aiToolEntity = new AiToolEntity();
            aiToolEntity.name = aiTool.title;
            aiToolEntity.slug = slugify(aiTool.title);
            aiToolEntity.description = aiTool.info;
            aiToolEntity.url = aiTool.website.toString();
            aiToolEntity.image = imageUploadedUrl;
            aiToolEntity.category = category.type;
            aiToolEntity.aiToolCategory = category;
            aiToolEntity.pricing = PricingEnum.FREE;
            aiToolEntity.isActive = false;
            aiToolEntity.admin = admin;

            const tagsSplited = tags.split(',');
            const aiToolPricing = tagsSplited[0];
            switch (aiToolPricing) {
              case 'Free':
                aiToolEntity.pricing = PricingEnum.FREE;
                break;
              case 'Paid':
                aiToolEntity.pricing = PricingEnum.PAID;
                break;
              case 'Free Trial':
                aiToolEntity.pricing = PricingEnum.FREE_TRIAL;
                break;
              case 'Freemium':
                aiToolEntity.pricing = PricingEnum.FREE_PLAN;
                break;
              default:
                aiToolEntity.pricing = PricingEnum.PAID;
            }

            console.log(aiToolEntity.pricing);

            await this.aiToolService.create(aiToolEntity);
          } catch (err) {
            console.log(`error while uploading image ${aiTool.title}`);
            listAiToolNotAdded.push(aiTool);
          }
        }
        if (listAiToolNotAdded.length > 0) {
          await this.mailingService.sendListNotAddedTools(
            listAiToolNotAdded,
            category.type,
          );
        }
      }
      resolve('done');
    });

    promiseAddListAi.then(() => {
      console.log('adding the list was done');
    });

    return {
      message: 'adding the list is in its way',
    };
  }*/

  @UseGuards(AuthAdminGuard)
  @Delete('/admin/delete')
  async delete(@Query('aiToolId') aiToolId: number) {
    const aiTool = await this.aiToolService.findById(aiToolId);
    if (!aiTool) {
      throw new HttpException('AI Tool not found', 404);
    }

    await this.aiToolService.softDelete(aiToolId);
    return {
      message: 'AI Tool deleted',
      id: aiToolId,
    };
  }

  // general function
  async generateImageFromUrl(
    image: Express.Multer.File,
    url: URL,
    name: string,
  ) {
    try {
      if (!image) {
        const screenShot = await this.screenShotService.getScreenShot(
          url.toString(),
        );
        return await this.s3AppService.uploadFileFromBuffer(
          screenShot,
          'public-read',
          'ai-tool',
          `${Date.now()}-${name}.png`,
        );
      } else {
        return await this.s3AppService.uploadFile(
          image,
          'public-read',
          'ai-tool',
        );
      }
    } catch (e) {
      LOG.error(e);

      throw new HttpException('Error while uploading image', 500);
    }
  }
}
