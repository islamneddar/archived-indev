import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTable} from '@/database/base-table.entity';
import {AiToolEntity} from '@/bussiness/domains/ai-tool/ai-tool/ai-tool.entity';
import {AIToolPlatformEnum} from '@/bussiness/domains/ai-tool/ai-tool-platform/ai-tool-platform.proto';

@Entity({
  name: 'ai_tool_platforms',
})
export class AiToolPlatformEntity extends BaseTable {
  @PrimaryGeneratedColumn({
    name: 'ai_tool_platform_id',
  })
  aiToolPlatformId: number;

  @Column({unique: true, nullable: false, name: 'name'})
  name: string;

  @Column({
    name: 'type',
    enum: AIToolPlatformEnum,
    type: 'enum',
    nullable: false,
  })
  type: AIToolPlatformEnum;

  @OneToMany(() => AiToolEntity, aiTool => aiTool.pricing)
  aiTools: AiToolEntity[];
}
