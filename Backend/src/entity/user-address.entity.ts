import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity({ name: "user_address" })
export class UserAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  address_ID: number;

  @Column()
  user_ID: number;

  @Column({ length: 150 })
  fullname: string;

  @Column({ length: 20 })
  mobile: string;

  @Column({ type: "text" })
  address: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;

  @Column({ length: 20 })
  pincode: string;

  @Column({ length: 100 })
  country: string;

  @Column({ default: 0 })
  is_default: number;

  /* RELATION WITH USER */
  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_ID" })
  user: User;
}