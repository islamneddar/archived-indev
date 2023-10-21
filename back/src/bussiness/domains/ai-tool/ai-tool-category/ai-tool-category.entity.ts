import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {AiToolCategoryEnum} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-catgory.proto';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';

@Entity({
  name: 'ai_tool_categories',
})
export class AiToolCategoryEntity extends BaseTable {
  @PrimaryGeneratedColumn({
    name: 'ai_tool_category_id',
  })
  aiToolCategoryId: number;

  @Column({unique: true, nullable: false, name: 'name'})
  name: string;

  @Column({
    name: 'type',
    type: 'enum',
    nullable: false,
    enum: AiToolCategoryEnum,
  })
  type: AiToolCategoryEnum;

  @Column({
    name: 'number_of_tool',
    nullable: false,
    default: 0,
  })
  numberOfTool: number;

  @OneToMany(() => AiToolEntity, aiTool => aiTool.category)
  aiTools: AiToolEntity[];
}
