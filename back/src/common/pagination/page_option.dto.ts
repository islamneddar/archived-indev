import {Type} from 'class-transformer';
import {IsEnum, IsInt, IsOptional, Max, Min} from 'class-validator';
import {Logger} from '@nestjs/common';
import {Order} from './constant/order.constant';

export class PageOptionsDto {
  private readonly logger = new Logger(PageOptionsDto.name);

  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
