import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('job_status')
export class JobStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'notbuild' })
  status: string;

  @Column({ name: 'full_string' })
  fullString: string;

  @Column({ name: 'represent_string' })
  representString: string;
}
