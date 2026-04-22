import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";

import { Product } from "./product.entity";

@Entity("product_images")
export class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  productimage_ID: number;

  @Column()
  product_ID: number;

  @Column({ type: "text" })
  image: string;

  @Column({ default: 0 })
  sort_order: number;

  @ManyToOne(
    () => Product,
    (product) => product.productImages,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "product_ID" })
  product: Product;
}