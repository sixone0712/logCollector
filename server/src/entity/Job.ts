import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JobNotification } from './JobNotification';
import { JobStatus } from './JobStatus';
import { Site } from './Site';
import { User } from './User';

@Entity('job')
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Site, (site) => site.id)
  @JoinColumn({ name: 'site_id' })
  siteId: Site;

  @Column('integer', { name: 'plan_ids', array: true, nullable: true })
  planids: number[];

  @OneToOne(() => JobStatus)
  @JoinColumn({ name: 'collect_status' })
  collectStatus: JobStatus;

  @OneToOne(() => JobStatus)
  @JoinColumn({ name: 'error_summary_status' })
  errorSummaryStatus: JobStatus;

  @OneToOne(() => JobStatus)
  @JoinColumn({ name: 'cras_data_status' })
  crasDataStatus: JobStatus;

  @OneToOne(() => JobStatus)
  @JoinColumn({ name: 'mpa_version_status' })
  mpaVersionStatus: JobStatus;

  @Column()
  stop: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner' })
  owner: User;

  @Column({ type: 'timestamp' })
  created: Date;

  @Column({ type: 'timestamp', name: 'last_action' })
  lastAction: Date;

  @Column({ name: 'job_type' })
  jobType: string;

  @OneToOne(() => JobNotification)
  @JoinColumn()
  notification: JobNotification;

  @Column('integer', { name: 'file_ids', array: true, nullable: true })
  fileIds: number[];

  @Column('text', { name: 'file_names', array: true, nullable: true })
  fileNames: string[];
}
