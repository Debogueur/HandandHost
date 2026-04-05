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
// import { Product } from "./product.entity"; // Assuming your Product file path

@Entity({ name: "T_M_Banner" })

export class Home extends BaseEntity {
    @PrimaryGeneratedColumn()
    N_T_M_Banner_ID: number;

    @Column()
    V_DigitalFile: string;

    @Column({ nullable: true })
    V_ImageAlt: string;

    @Column({ nullable: true })
    V_Title: string;

    @Column({ nullable: true })
    V_Description: string;

    @Column({ default: 1 })
    B_Active: number;


}