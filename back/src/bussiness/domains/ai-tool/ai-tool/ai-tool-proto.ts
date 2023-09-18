import {Transform, Type} from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import {AiToolCategoryEnum} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-catgory.proto';
import {PricingEnum} from '@/common/constant/pricing.enum';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';

export class CreateAiToolRequest {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => URL)
  @IsUrl()
  @IsNotEmpty()
  url: URL;

  @IsEnum(AiToolCategoryEnum)
  @IsNotEmpty()
  category: AiToolCategoryEnum;

  @IsEnum(PricingEnum)
  pricing: PricingEnum;
}

export class GetAllAiToolsQuery {
  @Transform(({value}) => {
    return value === 'true';
  })
  @IsBoolean()
  @IsNotEmpty()
  isAll: boolean;

  @IsEnum(AiToolCategoryEnum)
  category: AiToolCategoryEnum;

  @Type(() => PageOptionsDto)
  pageOption: PageOptionsDto;
}

export class GetAllAiToolNotValidatedQuery {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  page: number;
}

export class ValidateAiToolBody {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  aiToolId: number;
}
