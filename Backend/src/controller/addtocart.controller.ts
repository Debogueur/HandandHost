import { Request, Response } from "express";
import { ProductAddToCart } from "../entity/addtocart.entity";
import { AppDataSource } from "../core/database-config";

export const AddProductToCart = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      product_ID,
      productvariant_ID,
      User_ID,
      quantity,
    } = req.body;

    console.log('body..............................',req.body)

    /* =========================
       VALIDATION
    ========================= */
    
    if (
      !product_ID ||
      !User_ID ||
      !quantity
    ) {
      return res.status(400).json({
        status: false,
        message:
          "product_ID, User_ID and quantity are required",
      });
    }

    const repository =
      AppDataSource.getRepository(
        ProductAddToCart
      );

    /* =========================
       FIXED WHERE CONDITION
    ========================= */
    const whereCondition: any = {
      product_ID:
        Number(product_ID),
      User_ID:
        Number(User_ID),
    };

    if (
      productvariant_ID &&
      Number(productvariant_ID) > 0
    ) {
      whereCondition.productvariant_ID =
        Number(
          productvariant_ID
        );
    }

    /* =========================
       CHECK EXISTING
    ========================= */
    let existing = null;

    try {
      existing = await repository.findOne({
        where: whereCondition,
      });

      console.log("existing:", existing);
    } catch (dbError: any) {
      console.log(
        "FINDONE ERROR:",
        dbError
      );
    }
      console.log('body..............................',existing)

    /* =========================
       UPDATE QUANTITY
    ========================= */
    if (existing) {
      existing.quantity =
        Number(quantity);

      const updated =
        await repository.save(
          existing
        );

      return res.status(200).json({
        status: true,
        message:
          "Cart updated successfully",
        data: updated,
      });
    }

    /* =========================
       INSERT NEW
    ========================= */
    const cart =
      repository.create({
        product_ID:
          Number(product_ID),

        productvariant_ID:
          productvariant_ID
            ? Number(
                productvariant_ID
              )
            : null,

        User_ID:
          Number(User_ID),

        quantity:
          Number(quantity),
      });

    const saved =
      await repository.save(
        cart
      );

    return res.status(201).json({
      status: true,
      message:
        "Product added to cart successfully",
      data: saved,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message:
        "Error adding to cart",
      error: error.message,
    });
  }
};