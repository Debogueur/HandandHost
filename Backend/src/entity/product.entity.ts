import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from "./category.entity"; // Import your Category entity
@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;


    @Column()
    categoryId: number;

    // Add this relationship
    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}