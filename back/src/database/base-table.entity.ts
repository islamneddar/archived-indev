import {BaseEntity, Column, CreateDateColumn} from 'typeorm';

export abstract class BaseTable extends BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({name: 'soft_delete', default: false})
  softDelete: boolean;
}
