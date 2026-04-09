import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category.entity"; // Import your Category entity
import { ProductImage } from "./productimage.entity"; // Import your ProductImage entity

@Entity({ name: "product" })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: "mediumtext" })
    mainimage: string;

    @Column()
    tagline: string;

    @Column()
    benefits: string;

    @Column()
    price: number;


    @Column()
    discount_price: number;

    @Column()
    categoryId: number;

    @Column({ nullable: false, default: 1 })
    active: number;

    // Add this relationship
    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

   @OneToMany(() => ProductImage, (images: ProductImage) => images.product)
    productImages: ProductImage[];
}