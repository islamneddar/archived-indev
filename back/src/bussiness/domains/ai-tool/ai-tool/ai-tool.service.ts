import {Injectable, Logger} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {AiToolCategoryEnum} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-catgory.proto';
import {PageDto} from '@/common/pagination/page.dto';
import {PageMetaDto} from '@/common/pagination/page_meta.dto';
import {PricingEnum} from '@/common/constant/pricing.enum';

@Injectable()
export class AiToolService {
  private readonly logger = new Logger(AiToolService.name);

  constructor(
    @InjectRepository(AiToolEntity)
    private aiToolRepository: Repository<AiToolEntity>,
    private dataSource: DataSource,
  ) {}

  async create(aiTool: AiToolEntity) {
    return await this.aiToolRepository.save(aiTool);
  }

  async findOneBySlugAndWebsite(s: string, website: string) {
    return await this.aiToolRepository.findOne({
      where: {
        slug: s,
        url: website,
      },
    });
  }

  async findAll(param: {
    pageOption: PageOptionsDto;
    category?: AiToolCategoryEnum;
    pricing?: PricingEnum;
  }) {
    const {pageOption} = param;
    const {page, take} = pageOption;
    const offset = (page - 1) * take;

    const whereClause = {
      softDelete: false,
      isActive: true,
    };

    if (param.category) {
      whereClause['category'] = param.category;
    }

    if (param.pricing) {
      whereClause['pricing'] = param.pricing;
    }

    const [result, total] = await this.aiToolRepository.findAndCount({
      where: {
        ...whereClause,
      },
      order: {
        createdAt: 'DESC',
      },
      take,
      skip: offset,
      select: [
        'aiToolId',
        'name',
        'slug',
        'description',
        'url',
        'image',
        'category',
        'pricing',
        'createdAt',
      ],
    });

    return new PageDto<AiToolEntity>(
      result,
      new PageMetaDto({
        itemCount: total,
        pageOptionsDto: param.pageOption,
      }),
    );
  }

  async findAllByCategory(param: {
    pageOption: PageOptionsDto;
    category: AiToolCategoryEnum;
  }) {
    const {pageOption, category} = param;
    const {page, take} = pageOption;
    const offset = (page - 1) * take;

    const [result, total] = await this.aiToolRepository.findAndCount({
      where: {
        softDelete: false,
        category,
        isActive: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take,
      skip: offset,
      select: [
        'aiToolId',
        'name',
        'slug',
        'description',
        'url',
        'image',
        'category',
        'pricing',
        'createdAt',
      ],
    });

    return new PageDto<AiToolEntity>(
      result,
      new PageMetaDto({
        itemCount: total,
        pageOptionsDto: param.pageOption,
      }),
    );
  }

  async findAllNotValidated(page = 1, take = 100) {
    const skip = (page - 1) * take;
    const [data, total] = await this.aiToolRepository.findAndCount({
      where: {
        softDelete: false,
        isActive: false,
      },
      relations: ['admin'],
      order: {
        createdAt: 'DESC',
      },
      select: {
        aiToolId: true,
        name: true,
        slug: true,
        description: true,
        url: true,
        image: true,
        category: true,
        pricing: true,
        createdAt: true,
        isActive: true,
        admin: {
          id: true,
          email: true,
        },
      },
      skip: skip,
      take: take,
    });

    return {
      data,
      total,
    };
  }

  async validate(aiToolId: number) {
    await this.aiToolRepository.update(
      {
        aiToolId,
      },
      {
        isActive: true,
      },
    );
  }

  findById(aiToolId: number) {
    return this.aiToolRepository.findOne({
      where: {
        aiToolId,
      },
    });
  }
}
