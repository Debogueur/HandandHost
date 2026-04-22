import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Order } from "./order.entity";
import { Product } from "./product.entity";
import { ProductVariant } from "./productvariant.entity";

@Entity({ name: "order_items" })
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  orderitem_ID: number;

  @Column()
  order_ID: number;

  @Column()
  product_ID: number;

  @Column({ nullable: true })
  productvariant_ID: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column()
  quantity: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  total: number;

  /* ORDER */
  @ManyToOne(() => Order, (order) => order.order_items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_ID" })
  order: Order;

  /* PRODUCT */
  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_ID" })
  product: Product;

  /* VARIANT */
  @ManyToOne(() => ProductVariant, {
    nullable: true,
  })
  @JoinColumn({ name: "productvariant_ID" })
  productVariant: ProductVariant;
}