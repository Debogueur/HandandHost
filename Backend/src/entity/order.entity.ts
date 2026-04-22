import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";

import { User } from "./user.entity";
import { UserAddress } from "./user-address.entity";
import { OrderItem } from "./order-item.entity";

@Entity({ name: "orders" })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_ID: number;

  @Column()
  user_ID: number;

  @Column()
  address_ID: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  subtotal: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  discount: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  shipping_charge: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  total_amount: number;

  @Column()
  payment_method: string;

  @Column({ default: "Pending" })
  payment_status: string;

  @Column({ default: "Placed" })
  order_status: string;

  @CreateDateColumn()
  created_at: Date;

  /* USER */
  @ManyToOne(() => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_ID" })
  user: User;

  /* ADDRESS */
  @ManyToOne(() => UserAddress, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "address_ID" })
  address: UserAddress;

  /* ORDER ITEMS */
  @OneToMany(
    () => OrderItem,
    (item) => item.order
  )
  order_items: OrderItem[];
}