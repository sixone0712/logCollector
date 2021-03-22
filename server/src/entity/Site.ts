import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Job } from './Job';

@Entity('site')
export class Site extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  site_name: string;
  @Column()
  fab_name: string;

  @Column()
  address: string;

  @Column()
  port: number;

  @Column()
  user: string;

  @Column()
  password: string;

  @Column()
  db_address: string;

  @Column()
  db_port: number;

  @Column()
  db_password: string;

  @Column()
  mpa_count: number;

  @OneToMany(() => Job, (job) => job.id)
  job: Job[];
}
