import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from "typeorm";

import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity({ name: "product_reviews" })
export class ProductReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  review_ID: number;

  @Index()
  @Column()
  product_ID: number;

  @Index()
  @Column()
  user_ID: number;

  @Column()
  rating: number;

  @Column({ type: "text" })
  review: string;

  @CreateDateColumn()
  created_at: Date;

  /* ---------------- PRODUCT RELATION ---------------- */
  @ManyToOne(() => Product, (product) => product.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_ID" })
  product: Product;

  /* ---------------- USER RELATION ---------------- */
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_ID" })
  user: User;
}