import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('job_status')
export class JobStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'notbuild' })
  status: string;

  @Column()
  full_string: string;

  @Column()
  represent_string: string;
}
