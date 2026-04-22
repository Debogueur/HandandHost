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

  /* ================= PRODUCT ================= */
  @Column()
  product_ID: number;

  @ManyToOne(() => Product, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_ID" })
  product: Product;

  /* ================= VARIANT (IMPORTANT) ================= */
  @Column({ nullable: true })
  productvariant_ID: number;

  @ManyToOne(() => ProductVariant, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productvariant_ID" })
  productVariant: ProductVariant;

  /* ================= USER ================= */
  @Column()
  User_ID: number;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "User_ID" })
  user: User;

  /* ================= QUANTITY ================= */
  @Column({ default: 1 })
  quantity: number;

  /* ================= TIMESTAMP ================= */
  @CreateDateColumn()
  created_at: Date;
}