import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp, ManyToOne } from 'typeorm';
import { Job } from './Job';

@Entity('job_history')
export class JobHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Job, (job) => job.id)
  // @Column()
  // job: Job;

  @Column()
  type: string;

  @Column({ type: 'text', name: 'file_id' })
  fileId: string;

  @Column({ type: 'timestamp' })
  created: Date;
}
