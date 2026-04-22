import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from "typeorm";

import { Product } from "./product.entity";
import { ProductVariant } from "./productvariant.entity";
import { User } from "./user.entity";

@Entity({ name: "productwishlist" })
 @Unique(["product_ID", "User_ID"/*, "productvariant_ID"*/])
export class Wishlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  productwishlist_ID: number;

  @Column()
  product_ID: number;

  @Column({ nullable: true })
  productvariant_ID: number;

  @Column()
  User_ID: number;

  /* PRODUCT */
  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_ID" })
  product: Product;

  /* VARIANT */
  @ManyToOne(() => ProductVariant, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productvariant_ID" })
  productVariant: ProductVariant;

  /* USER */
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "User_ID" })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}