import { Request, Response } from "express";
import { ProductAddToCart } from "../entity/addtocart.entity";
import { AppDataSource } from "../core/database-config";
import { Product } from "../entity/product.entity";
import { Wishlist } from "../entity/wishlist.entity";

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



export const GetCartProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const User_ID = Number(
      req.params.userId
    );

    if (isNaN(User_ID)) {
      return res.status(400).json({
        status: false,
        message:
          "Valid userId required",
      });
    }

    const raw =
      await AppDataSource
        .getRepository(Product)
        .createQueryBuilder(
          "product"
        )

        /* ONLY PRODUCTS INSIDE USER CART */
        .innerJoin(
          "productaddtocart",
          "cart",
          "cart.product_ID = product.id AND cart.User_ID = :User_ID",
          { User_ID }
        )

        /* CHECK WISHLIST */
        .leftJoin(
          Wishlist,
          "wishlist",
          "wishlist.product_ID = product.id AND wishlist.User_ID = :User_ID",
          { User_ID }
        )

        .select([
          "product.id as id",
          "product.title as title",
          "product.slug as slug",
          "product.description as description",
          "product.short_description as short_description",
          "product.tagline as tagline",
          "product.benefits as benefits",
          "product.sku as sku",
          "product.brand as brand",
          "product.price as price",
          "product.discount_price as discount_price",
          "product.categoryId as categoryId",
          "product.varianttype_ID as varianttype_ID",
          "product.mainimage as mainimage",
          "product.stock as stock",
          "product.is_featured as is_featured",
          "product.is_new as is_new",
          "product.is_trending as is_trending",
          "product.active as active",
          "product.created_at as created_at",
          "product.updated_at as updated_at",

          /* CART */
          "1 as isAddedToCart",
          "cart.productaddtocart_ID as productaddtocart_ID",
          "cart.quantity as quantity",

          /* WISHLIST */
          "CASE WHEN wishlist.productwishlist_ID IS NULL THEN 0 ELSE 1 END as isWishlisted",
          "IFNULL(wishlist.productwishlist_ID,0) as productwishlist_ID",
        ])

        .getRawMany();

    const data = raw.map(
      (item: any) => ({
        ...item,

        id: Number(item.id),
        stock: Number(item.stock),
        price: Number(item.price),
        discount_price: Number(
          item.discount_price || 0
        ),

        quantity: Number(
          item.quantity || 1
        ),

        isAddedToCart: Number(
          item.isAddedToCart || 0
        ),

        productaddtocart_ID:
          Number(
            item.productaddtocart_ID ||
              0
          ),

        isWishlisted: Number(
          item.isWishlisted || 0
        ),

        productwishlist_ID:
          Number(
            item.productwishlist_ID ||
              0
          ),
      })
    );

    return res.json({
      status: true,
      message:
        "Cart fetched successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message:
        error.message,
    });
  }
};