import { Request, Response } from "express";
import { addtocart } from "../entity/addtocart.entity";
import { AppDataSource } from "../core/database-config";


export const AddProductToWishlist = async (req: Request, res: Response) => {
  try {
    const { product_ID, User_ID, quantity } = req.body;

    if (!product_ID || !User_ID) {
      return res.status(400).json({ message: "product_ID and User_ID are required" });
    }

    const repository = AppDataSource.getRepository(addtocart);

    //  Check if already exists
    const existing = await repository.findOne({
      where: { product_ID, User_ID },
    });

    if (existing) {
      return res.status(200).json({
        message: "Product already in added to cart",
        data: existing,
      });
    }

    // 🔹 Create new wishlist item
    const productaddtocart = repository.create({
      product_ID,
      User_ID,
      quantity
    });

    const savedaddtocart = await repository.save(productaddtocart);

    return res.status(201).json({
      data: savedaddtocart,
      message: "Product added to cart successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error creating cart item",
      error: error.message,
    });
  }
};
