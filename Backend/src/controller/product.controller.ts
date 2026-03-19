import { Request, Response } from "express";
import { Product } from "../entity/product.entity";
import { AppDataSource } from "../core/database-config";

// 1. Get all products with pagination and category relations
export const Products = async (req: Request, res: Response) => {
    const { page = 1, categoryId, minPrice, maxPrice, rating } = req.query;
    const take = 15;
    const repository = AppDataSource.getRepository(Product);

    const query = repository.createQueryBuilder("product")
        .leftJoinAndSelect("product.category", "category")
        .skip((Number(page) - 1) * take)
        .take(take);

    if (categoryId) {
        query.andWhere("product.categoryId = :categoryId", { categoryId });
    }

    if (minPrice) {
        query.andWhere("product.price >= :minPrice", { minPrice });
    }

    if (maxPrice) {
        query.andWhere("product.price <= :maxPrice", { maxPrice });
    }

    const [data, total] = await query.getManyAndCount();

    res.send({
        data,
        meta: { total, page: Number(page), last_page: Math.ceil(total / take) }
    });
};

// 2. Create Product
export const CreateProduct = async (req: Request, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(Product);

        // Explicitly create a new instance to trigger any entity listeners/hooks
        const product = repository.create(req.body);
        const savedProduct = await repository.save(product);

        res.status(201).json({
            data: savedProduct,
            message: "Product created successfully"
        });
    } catch (error: any) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

// 3. Get Single Product (For Edit Page)
export const GetProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const repository = AppDataSource.getRepository(Product);

        const product = await repository.findOne({
            where: { id },
            relations: ['category']
        });

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.send({ data: product });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Update Product
export const UpdateProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const repository = AppDataSource.getRepository(Product);

        // Fetch existing product first
        let product = await repository.findOne({ where: { id } });
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Merge new data into existing entity
        repository.merge(product, req.body);
        const updatedProduct = await repository.save(product);

        res.send({
            data: updatedProduct,
            message: "Product updated successfully"
        });
    } catch (error: any) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

// 5. Delete Product
export const DeleteProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const repository = AppDataSource.getRepository(Product);

        const product = await repository.findOne({ where: { id } });
        if (!product) return res.status(404).json({ message: "Product not found" });

        await repository.remove(product);
        res.status(204).send(null);
    } catch (error: any) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};