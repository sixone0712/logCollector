import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobHistory } from './JobHistory';
import { JobNotification } from './JobNotification';
import { JobStatus } from './JobStatus';
import { Site } from './Site';
import { User } from './User';

@Entity('job')
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Site, (site) => site.id)
  site_id: Site;

  @OneToOne(() => JobStatus)
  @JoinColumn()
  collect_status: JobStatus;

  @OneToOne(() => JobStatus)
  @JoinColumn()
  error_summary_status: JobStatus;

  @OneToOne(() => JobStatus)
  @JoinColumn()
  cras_status: JobStatus;

  @OneToOne(() => JobStatus)
  @JoinColumn()
  version_check_status: JobStatus;

  @Column()
  stop: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  owner: User;

  @Column({ type: 'timestamp' })
  created: Date;

  @Column({ type: 'timestamp' })
  last_action: Date;

  @Column()
  job_type: string;

  @OneToOne(() => JobNotification)
  @JoinColumn()
  notification: JobNotification;

  @Column()
  file_path: string;
}
