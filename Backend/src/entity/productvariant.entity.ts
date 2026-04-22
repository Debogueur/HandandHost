import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Product } from "./product.entity";
import { VariantValue } from "./variantvalue.entity";

@Entity({ name: "product_variants" })
export class ProductVariant extends BaseEntity {
  @PrimaryGeneratedColumn()
  productvariant_ID: number;

  @Column()
  product_ID: number;

  @Column()
  variantvalue_ID: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  extra_price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true })
  sku: string;

  @Column({ default: 1 })
  active: number;

  /* PRODUCT */
  @ManyToOne(() => Product, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_ID" })
  product: Product;

  /* VARIANT VALUE */
  @ManyToOne(() => VariantValue, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "variantvalue_ID" })
  variantValue: VariantValue;
}