import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import {AIToolPricingEnum} from '@/bussiness/domains/ai-tool/ai-tool-pricing/ai-tool-pricing-proto';

@Entity({
  name: 'ai_tool_pricing',
})
export class AiToolPricingEntity extends BaseTable {
  @PrimaryGeneratedColumn({
    name: 'ai_tool_pricing_id',
  })
  aiToolPricingId: number;

  @Column({unique: true, nullable: false, name: 'name'})
  name: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: AIToolPricingEnum,
    nullable: false,
  })
  type: AIToolPricingEnum;

  @OneToMany(() => AiToolEntity, aiTool => aiTool.pricing)
  aiTools: AiToolEntity[];
}
