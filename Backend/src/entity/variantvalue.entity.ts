// variantvalue.entity.ts

import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { VariantType } from "./varianttype.entity";

@Entity({ name: "variantvalues" })
export class VariantValue extends BaseEntity {
  @PrimaryGeneratedColumn()
  variantvalue_ID: number;

  @Column()
  varianttype_ID: number;

  @Column()
  value: string;

  @Column({ default: 1 })
  active: number;

  @ManyToOne(
    () => VariantType,
    (variantType) => variantType.variantValues
  )
  @JoinColumn({ name: "varianttype_ID" })
  variantType: VariantType;
}