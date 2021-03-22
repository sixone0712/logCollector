import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MailContext } from './MailContext';

@Entity('job_notification')
export class JobNotification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  error_summary: boolean;

  @Column()
  cras: boolean;

  @Column()
  version: boolean;

  @OneToOne(() => MailContext)
  @JoinColumn()
  error_email: MailContext;

  @OneToOne(() => MailContext)
  @JoinColumn()
  cras_email: MailContext;

  @OneToOne(() => MailContext)
  @JoinColumn()
  version_email: MailContext;

  @Column({ type: 'text', array: true })
  sending_time: string[];

  @Column()
  before: number;
}
