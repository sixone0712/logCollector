import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('setting_db')
export class SettingDB extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  port: number;

  @Column()
  user: string;

  @Column()
  password: string;
}
