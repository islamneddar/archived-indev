import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'newsletter_emails' })
export class NewsletterEmailEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'newsletter_email_id' })
  newsletterEmailId: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, default: true })
  subscribed: boolean;
}
