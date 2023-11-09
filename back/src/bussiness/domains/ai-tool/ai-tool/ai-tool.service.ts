import {Injectable, Logger} from '@nestjs/common';
import {Repository} from 'typeorm';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {AiToolCategoryEnum} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-catgory.proto';
import {PageDto} from '@/common/pagination/page.dto';
import {PageMetaDto} from '@/common/pagination/page_meta.dto';
import {AIToolPricingEnum} from '@/bussiness/domains/ai-tool/ai-tool-pricing/ai-tool-pricing-proto';
import {Raw} from 'typeorm';

@Injectable()
export class AiToolService {
  private readonly logger = new Logger(AiToolService.name);

  constructor(
    @InjectRepository(AiToolEntity)
    private aiToolRepository: Repository<AiToolEntity>,
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

  async findAllActiveNotDeletedWithFilters(param: {
    pageOption: PageOptionsDto;
    category?: AiToolCategoryEnum;
    pricing?: AIToolPricingEnum;
    searchText?: string;
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

    if (param.searchText) {
      whereClause['description'] = Raw(
        alias => `to_tsvector(${alias}) @@ to_tsquery(:query)`,
        {
          query: `${param.searchText
            .trim()
            .split(' ')
            .filter(word => word.length >= 3)
            .map(word => `${word}:*`)
            .join(' & ')}`,
        },
      );
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

  // @deperecated
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

  async findByIdForPublic(aiToolId: number) {
    return await this.aiToolRepository.findOne({
      where: {
        aiToolId,
      },
      relations: ['admin', 'aiToolCategory', 'aiToolPricing', 'aiToolPlatform'],
      select: {
        ...this.selectPublicAiTool,
      },
    });
  }

  async update(aiTool: AiToolEntity) {
    return await this.aiToolRepository.update(
      {
        aiToolId: aiTool.aiToolId,
      },
      aiTool,
    );
  }

  async softDelete(aiToolId: number) {
    console.log(aiToolId);
    await this.aiToolRepository.update(
      {
        aiToolId,
      },
      {
        softDelete: true,
      },
    );
  }

  async findAllNotConfirmedByAdminAndNotDeleted(page: number, take = 100) {
    const skip = (page - 1) * take;
    const [data, total] = await this.aiToolRepository.findAndCount({
      where: {
        softDelete: false,
        isConfirmedByAdmin: false,
      },
      relations: ['admin', 'aiToolCategory', 'aiToolPricing', 'aiToolPlatform'],
      order: {
        updatedAt: 'ASC',
      },
      select: {
        ...this.selectPublicAiTool,
      },
      skip: skip,
      take: take,
    });

    return {
      data,
      total,
    };
  }

  async confirmByAdmin(aiToolId: number) {
    await this.aiToolRepository.update(
      {
        aiToolId,
      },
      {
        isConfirmedByAdmin: true,
      },
    );
  }

  async findAll() {
    return await this.aiToolRepository.find({
      relations: ['admin', 'aiToolCategory', 'aiToolPricing', 'aiToolPlatform'],
      order: {
        createdAt: 'DESC',
      },
      select: {
        ...this.selectPublicAiTool,
      },
    });
  }

  private selectPublicAiTool = {
    aiToolId: true,
    name: true,
    description: true,
    url: true,
    image: true,
    category: true,
    pricing: true,
    updatedAt: true,
    createdAt: true,
    admin: {
      id: true,
      email: true,
    },
    aiToolCategory: {
      aiToolCategoryId: true,
      name: true,
      type: true,
    },
    aiToolPricing: {
      aiToolPricingId: true,
      name: true,
      type: true,
    },
    aiToolPlatform: {
      aiToolPlatformId: true,
      name: true,
      type: true,
    },
    isConfirmedByAdmin: true,
    featuresText: true,
  };
}
