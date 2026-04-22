// import { Request, Response } from "express";
// import { wishlist } from "../entity/wishlist.entity";
// import { AppDataSource } from "../core/database-config";


// export const AddProductToWishlist = async (req: Request, res: Response) => {
//   try {
//     const { product_ID, User_ID } = req.body;

//     if (!product_ID || !User_ID) {
//       return res.status(400).json({ message: "product_ID and User_ID are required" });
//     }

//     const repository = AppDataSource.getRepository(wishlist);

//     //  Check if already exists
//     const existing = await repository.findOne({
//       where: { product_ID, User_ID },
//     });

//     if (existing) {
//       return res.status(200).json({
//         message: "Product already in wishlist",
//         data: existing,
//       });
//     }

//     // 🔹 Create new wishlist item
//     const productwishlist = repository.create({
//       product_ID,
//       User_ID,
//     });

//     const savedWishlistItem = await repository.save(productwishlist);

//     return res.status(201).json({
//       data: savedWishlistItem,
//       message: "Product added to wishlist successfully",
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       message: "Error creating wishlist item",
//       error: error.message,
//     });
//   }
// };


import { Request, Response } from "express";
import { Wishlist } from "../entity/wishlist.entity";
import { AppDataSource } from "../core/database-config";

export const AddProductToWishlist = async (req: Request, res: Response) => {
  try {

    
    const product_ID = Number(req.body.product_ID);
    const User_ID = Number(req.body.User_ID);

    if (!product_ID || !User_ID) {
      return res.status(400).json({
        status: false,
        message: "product_ID and User_ID required",
      });
    }

    const repository = AppDataSource.getRepository(Wishlist);

    const existing = await repository.findOne({
      where: { product_ID, User_ID },
    });


    if (existing) {
      return res.status(200).json({
        status: true,
        message: "Already in wishlist",
        data: {
          productwishlist_ID: existing.productwishlist_ID,
          product_ID,
        },
      });
    }

    const newItem = repository.create({
      product_ID,
      User_ID,
    });
    console.log("New Wishlist Item:", newItem); // Debug log
    const saved = await repository.save(newItem);

    console.log("Request Body:", saved); // Debug log

    return res.status(201).json({
      status: true,
      message: "Added successfully",
      data: {
        productwishlist_ID: saved.productwishlist_ID,
        product_ID,
      },
    });

  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const RemoveProductFromWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const repository =
      AppDataSource.getRepository(Wishlist);

    const item = await repository.findOne({
      where: {
        productwishlist_ID: id,
      },
    });

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Item not found",
      });
    }

    await repository.remove(item);

    return res.json({
      status: true,
      message: "Removed successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};