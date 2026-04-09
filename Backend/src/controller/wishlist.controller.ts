import { Request, Response } from "express";
import { wishlist } from "../entity/wishlist.entity";
import { AppDataSource } from "../core/database-config";


export const AddProductToWishlist = async (req: Request, res: Response) => {
  try {
    const { product_ID, User_ID } = req.body;

    if (!product_ID || !User_ID) {
      return res.status(400).json({ message: "product_ID and User_ID are required" });
    }

    const repository = AppDataSource.getRepository(wishlist);

    //  Check if already exists
    const existing = await repository.findOne({
      where: { product_ID, User_ID },
    });

    if (existing) {
      return res.status(200).json({
        message: "Product already in wishlist",
        data: existing,
      });
    }

    // 🔹 Create new wishlist item
    const productwishlist = repository.create({
      product_ID,
      User_ID,
    });

    const savedWishlistItem = await repository.save(productwishlist);

    return res.status(201).json({
      data: savedWishlistItem,
      message: "Product added to wishlist successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error creating wishlist item",
      error: error.message,
    });
  }
};
