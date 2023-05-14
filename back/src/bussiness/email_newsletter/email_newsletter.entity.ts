import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTable} from '../../database/base-table.entity';

@Entity({name: 'newsletter_emails'})
export class NewsletterEmailEntity extends BaseTable {
  @PrimaryGeneratedColumn({name: 'newsletter_email_id'})
  newsletterEmailId: number;

  @Column({unique: true, nullable: false})
  email: string;

  @Column({nullable: false, default: true})
  subscribed: boolean;
}
