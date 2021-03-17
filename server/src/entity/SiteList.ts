import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('site_list')
export class SiteList extends BaseEntity {
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
}
