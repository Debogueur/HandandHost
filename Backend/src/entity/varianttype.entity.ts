// varianttype.entity.ts

import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

import { VariantValue } from "./variantvalue.entity";

@Entity({ name: "varianttypes" })
export class VariantType extends BaseEntity {
  @PrimaryGeneratedColumn()
  varianttype_ID: number;

  @Column()
  variant: string;

  @Column({ default: 1 })
  active: number;

  @OneToMany(
    () => VariantValue,
    (variantValue) => variantValue.variantType
  )
  variantValues: VariantValue[];
}