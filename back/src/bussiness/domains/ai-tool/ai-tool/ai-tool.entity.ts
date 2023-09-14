import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {AiToolCategoryEnum} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-catgory.proto';
import {PricingEnum} from '@/common/constant/pricing.enum';
import {AdminInAiTimesEntity} from '@/bussiness/inaitimer-admin/inaitimer-admin.entity';

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
    enum: PricingEnum,
  })
  pricing: PricingEnum;

  @Column({nullable: false, default: false, name: 'is_active'})
  isActive: boolean;

  @ManyToOne(() => AdminInAiTimesEntity, admin => admin.aiTools)
  @JoinColumn({name: 'admin_id'})
  admin: AdminInAiTimesEntity;
}
