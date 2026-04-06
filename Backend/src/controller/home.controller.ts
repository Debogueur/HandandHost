import { Request, Response } from "express";
import { Home } from "../entity/home.entity";
import { Category } from "../entity/category.entity";
import { AppDataSource } from "../core/database-config";



// 2. Get Category Tree (Nested JSON structure)
export const HomeBanner = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.query.id as string);
        const repository = AppDataSource.getRepository(Home);

        const data = await repository
        .createQueryBuilder("banner") //alias (NOT table name)
        .where("banner.B_Active = :active", { active: 1 })
        .getMany();

        res.send(data );
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const subcategorylist = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const repository = AppDataSource.getRepository(Category);

        const data = await repository
        .createQueryBuilder("subcategory") //alias (NOT table name)
        .where("subcategory.active = :active", { active: 1 })
        .andWhere("subcategory.parentId IS NOT NULL")
        .getMany();

        res.send(data );
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};