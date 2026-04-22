import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Category } from "./category.entity";
import { ProductImage } from "./productimage.entity";
import { VariantType } from "./varianttype.entity";

@Entity({ name: "product" })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({
    length: 255,
    nullable: true,
  })
  slug: string;

  @Column({
    type: "longtext",
    nullable: true,
  })
  description: string;

  @Column({
    type: "text",
    nullable: true,
  })
  short_description: string;

  @Column({
    nullable: true,
  })
  tagline: string;

  @Column({
    type: "text",
    nullable: true,
  })
  benefits: string;

  @Column({
    nullable: true,
  })
  sku: string;

  @Column({
    nullable: true,
  })
  brand: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  discount_price: number;

  @Column()
  categoryId: number;

  @Column({
    nullable: true,
  })
  varianttype_ID: number;

  @Column({
    type: "mediumtext",
    nullable: true,
  })
  mainimage: string;

  @Column({
    default: 0,
  })
  stock: number;

  @Column({
    default: 0,
  })
  is_featured: number;

  @Column({
    default: 0,
  })
  is_new: number;

  @Column({
    default: 0,
  })
  is_trending: number;

  @Column({
    default: 1,
  })
  active: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /* CATEGORY */
  @ManyToOne(
    () => Category,
    (category) => category.products
  )
  @JoinColumn({
    name: "categoryId",
  })
  category: Category;

  /* VARIANT TYPE */
  @ManyToOne(
    () => VariantType,
    { nullable: true }
  )
  @JoinColumn({
    name: "varianttype_ID",
  })
  variantType: VariantType;

  /* PRODUCT IMAGES */
  @OneToMany(
    () => ProductImage,
    (images) => images.product
  )
  productImages: ProductImage[];
}