import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./product.entity"; // Import your Category entity
@Entity({ name: "productwishlist" })
export class wishlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    productwishlist_ID: number;

    @Column()
    product_ID: number;

    @Column()
    User_ID: number;

    // Add this relationship
    @ManyToOne(() => Product, (product) => product.id)
    product: Product;


}