import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany,
    Tree,
    TreeChildren,
    TreeParent
} from "typeorm";
import { Product } from "./product.entity"; // Assuming your Product file path

@Entity()
@Tree("materialized-path") // Efficient way to query trees
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    // This points to the parent category
    @TreeParent()
    parent: Category;

    // This contains all immediate sub-categories
    @TreeChildren()
    children: Category[];

    // Relationship with Products (Optional)
    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}