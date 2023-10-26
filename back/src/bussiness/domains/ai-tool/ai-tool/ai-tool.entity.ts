import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {AiToolCategoryEnum} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-catgory.proto';
import {AIToolPricingEnum} from '@/bussiness/domains/ai-tool/ai-tool-pricing/ai-tool-pricing-proto';
import {AdminInAiTimesEntity} from '@/bussiness/inaitimer-admin/inaitimer-admin.entity';
import {AiToolCategoryEntity} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.entity';
import {AiToolPricingEntity} from '@/bussiness/domains/ai-tool/ai-tool-pricing/ai-tool-pricing.entity';
import {AiToolPlatformEntity} from '@/bussiness/domains/ai-tool/ai-tool-platform/ai-tool-platform.entity';

@Entity({
  name: 'ai_tools',
})
export class AiToolEntity extends BaseTable {
  @PrimaryGeneratedColumn({
    name: 'ai_tool_id',
  })
  aiToolId: number;

  @Column({unique: true, nullable: false, name: 'name'})
  name: string;

  @Column({unique: true, nullable: false, name: 'slug'})
  slug: string;

  @Index({fulltext: true})
  @Column({nullable: false, name: 'description'})
  description: string;

  @Column({unique: true, nullable: false, name: 'permalink'})
  url: string;

  @Column({nullable: false, name: 'image'})
  image: string;

  @Column({
    name: 'category',
    type: 'enum',
    nullable: false,
    enum: AiToolCategoryEnum,
  })
  category: AiToolCategoryEnum;

  @Column({
    name: 'pricing',
    type: 'enum',
    nullable: false,
    enum: AIToolPricingEnum,
  })
  pricing: AIToolPricingEnum;

  @Column({nullable: false, default: false, name: 'is_active'})
  isActive: boolean;

  @ManyToOne(() => AdminInAiTimesEntity, admin => admin.aiTools)
  @JoinColumn({name: 'admin_id'})
  admin: AdminInAiTimesEntity;

  @ManyToOne(
    () => AiToolCategoryEntity,
    aiToolCategory => aiToolCategory.aiTools,
  )
  @JoinColumn({name: 'ai_tool_category_id'})
  aiToolCategory: AiToolCategoryEntity;

  @ManyToOne(() => AiToolPricingEntity, aiToolPricing => aiToolPricing.aiTools)
  @JoinColumn({name: 'ai_tool_pricing_id'})
  aiToolPricing: AiToolPricingEntity;

  @ManyToOne(
    () => AiToolPlatformEntity,
    aiToolPlatform => aiToolPlatform.aiTools,
  )
  @JoinColumn({name: 'ai_tool_platform_id'})
  aiToolPlatform: AiToolPlatformEntity;
}
