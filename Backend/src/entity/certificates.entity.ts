import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity
} from "typeorm";

@Entity({ name: "T_M_Certificate" })
export class Certificate extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "smallint", unsigned: true })
    N_T_M_Certificate_ID: number;

    @Column({ type: "mediumtext" })
    V_Certificate: string; // image / file path or URL

    @Column({ type: "varchar", length: 30, nullable: true })
    V_Type: string;

    @Column({ type: "int", default: 1 })
    B_Active: number;
}