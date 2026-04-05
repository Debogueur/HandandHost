import { Request, Response } from "express";
import { Home } from "../entity/home.entity";
import { AppDataSource } from "../core/database-config";



// 2. Get Category Tree (Nested JSON structure)
export const HomeBanner = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const repository = AppDataSource.getRepository(Home);

        const data = await repository
        .createQueryBuilder("banner") //alias (NOT table name)
        .getMany();

        res.send(data );
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};