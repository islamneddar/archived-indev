import {Type} from 'class-transformer';
import {IsEnum, IsNotEmpty, IsString, IsUrl} from 'class-validator';
import {AiToolCategoryEnum} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-catgory.proto';
import {PricingEnum} from '@/common/constant/pricing.enum';

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
