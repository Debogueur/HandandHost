import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
} from "typeorm";

import { Product } from "./product.entity";
import { ProductVariant } from "./productvariant.entity";
import { User } from "./user.entity";

@Entity({ name: "productaddtocart" })
@Unique(["product_ID", "User_ID", "productvariant_ID"])
export class ProductAddToCart extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  productaddtocart_ID: number;

  @Column()
  product_ID: number;

  @Column({ nullable: true })
  productvariant_ID?: number | null;

  @Column()
  User_ID: number;

  @Column({ default: 1 })
  quantity: number;

  @CreateDateColumn()
  created_at: Date;
}