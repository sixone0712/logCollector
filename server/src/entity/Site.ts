import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Job } from './Job';

@Entity('site')
export class Site extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'site_name' })
  siteName: string;

  @Column({ name: 'fab_name' })
  fabName: string;

  @Column()
  address: string;

  @Column()
  port: number;

  @Column()
  user: string;

  @Column()
  password: string;

  @Column({ name: 'db_address' })
  dbAddress: string;

  @Column({ name: 'db_port' })
  dbPort: number;

  @Column({ name: 'db_password' })
  dbPassword: string;

  @Column('integer', { name: 'excute_mpas', array: true, nullable: true })
  excuteMpas: number[];

  @OneToMany(() => Job, (job) => job.id)
  job: Job[];
}
