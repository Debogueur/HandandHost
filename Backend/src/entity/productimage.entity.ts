import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('productimages')
export class ProductImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    images: string;

    @ManyToOne(() => Product, (product) => product.productImages)
    @JoinColumn({ name: "productId" }) //  very important
    product: Product;
}