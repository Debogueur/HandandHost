// user.entity.ts

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

import { UserAddress } from "./user-address.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  whatsapp_number: string;

  @OneToMany(() => UserAddress, (address) => address.user)
  addresses: UserAddress[];
}