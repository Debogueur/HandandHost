import { Request, Response } from "express";
import { Category } from "../entity/category.entity";
import { AppDataSource } from "../core/database-config";

// 1. Get all categories (Flat list for dropdowns/tables)
export const Categories = async (req: Request, res: Response) => {
    try {
        const take = 50;
        const page = parseInt(req.query.page as string || '1');
        const repository = AppDataSource.getRepository(Category);

        const [data, total] = await repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations: ['parent'],
            order: { name: "ASC" }
        });

        res.send({
            data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Get Category Tree (Nested JSON structure)
export const CategoryTree = async (req: Request, res: Response) => {
    try {
        const repository = AppDataSource.getTreeRepository(Category);
        const tree = await repository.findTrees();
        res.send(tree);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Create Category
export const CreateCategory = async (req: Request, res: Response) => {
    try {
        const { name, description, parentId } = req.body;
        const repository = AppDataSource.getTreeRepository(Category);

        const category = new Category();
        category.name = name;
        category.description = description;

        if (parentId) {
            const parent = await repository.findOne({ where: { id: parseInt(parentId) } });
            if (!parent) return res.status(404).json({ message: "Parent not found" });
            category.parent = parent;
        }

        const savedCategory = await repository.save(category);
        res.status(201).json({ data: savedCategory, message: "Category created successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

// 4. Get Single Category (For Edit Page defaults)
export const GetCategory = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const repository = AppDataSource.getRepository(Category);

        const category = await repository.findOne({
            where: { id },
            relations: ['parent']
        });

        if (!category) return res.status(404).json({ message: "Category not found" });
        res.send({ data: category });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// 5. Update Category
export const UpdateCategory = async (req: Request, res: Response) => {
    try {
        const { name, description, parentId } = req.body;
        const id = parseInt(req.params.id);
        const repository = AppDataSource.getTreeRepository(Category);

        const category = await repository.findOne({ where: { id } });
        if (!category) return res.status(404).json({ message: "Category not found" });

        category.name = name || category.name;
        category.description = description !== undefined ? description : category.description;

        if (parentId !== undefined) {
            if (parentId === null || parentId === "") {
                category.parent = null;
            } else {
                const newParentId = parseInt(parentId);
                if (newParentId === id) return res.status(400).json({ message: "Cannot be own parent" });

                const parent = await repository.findOne({ where: { id: newParentId } });
                if (parent) category.parent = parent;
            }
        }

        const updatedCategory = await repository.save(category);
        res.send({ data: updatedCategory, message: "Category updated successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

// 6. Delete Category (Updated for Tree safety)
export const DeleteCategory = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const repository = AppDataSource.getRepository(Category);

        const category = await repository.findOne({ where: { id } });
        if (!category) return res.status(404).json({ message: "Category not found" });

        await repository.remove(category); // .remove() is better for Tree listeners than .delete()
        res.status(204).send(null);
    } catch (error: any) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};