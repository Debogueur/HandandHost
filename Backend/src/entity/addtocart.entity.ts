import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./product.entity"; // Import your Category entity
@Entity({ name: "productaddtocart" })
export class addtocart extends BaseEntity {
    @PrimaryGeneratedColumn()
    productaddtocart_ID: number;

    @Column()
    product_ID: number;

    @Column()
    User_ID: number;

    @Column()
    quantity: number;

    // Add this relationship
    @ManyToOne(() => Product, (product) => product.id)
    product: Product;


}