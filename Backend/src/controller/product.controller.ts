import { Request, Response } from "express";
import { Product } from "../entity/product.entity";
import { ProductReview } from "../entity/productreview.entity";
import { ProductAddToCart } from "../entity/addtocart.entity";
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



export const GetOneProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.params?.userId;

    const repository = AppDataSource.getRepository(Product);

    const product = await repository
      .createQueryBuilder("product")

      // relations
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.productImages", "productImages")

      /* ================= VARIANT ================= */
      .leftJoinAndSelect("product.variantType", "variantType")
      .leftJoinAndSelect(
          "variantType.variantValues",
          "variantValues",
          "variantValues.active = 1"
        )

      // wishlist join
      .leftJoin(
        "productwishlist",
        "wishlist",
        "wishlist.product_ID = product.id AND wishlist.user_ID = :userId",
        { userId }
      )

      // cart join
      .leftJoin(
        "productaddtocart",
        "cart",
        "cart.product_ID = product.id AND cart.user_ID = :userId",
        { userId }
      )

      // filters
      .where("product.id = :id", { id })
      .andWhere("product.active = :active", { active: 1 })

      /* ================= FLAGS ================= */
      .addSelect(
        `CASE WHEN wishlist.productwishlist_ID IS NOT NULL THEN 1 ELSE 0 END`,
        "isWishlisted"
      )
      .addSelect("wishlist.productwishlist_ID", "productwishlist_ID")

      .addSelect(
        `CASE WHEN cart.productaddtocart_ID IS NOT NULL THEN 1 ELSE 0 END`,
        "isAddedToCart"
      )
      .addSelect("cart.productaddtocart_ID", "productaddtocart_ID")
      .addSelect("cart.quantity", "cartQuantity")

      .getRawAndEntities();

    if (!product.entities.length) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const entity = product.entities[0];
    const raw = product.raw[0];

    const { category, ...rest } = entity;

    console.log('raw..............................................',raw);

    const response = {
      ...rest,

      category_name: category?.name || null,
      category_image: category?.image || null,
      category_imagealt: category?.imagealt || null,

      // flags
      isWishlisted: raw.isWishlisted,
      productwishlist_ID: raw.productwishlist_ID,

      isAddedToCart: raw.isAddedToCart,
      productaddtocart_ID: raw.productaddtocart_ID,
      quantity: raw.cartQuantity || 0,
      

      /* ================= VARIANT (ADDED) ================= */
      variant: entity.variantType
      ? {
          variant: entity.variantType.variant,
          values: entity.variantType.variantValues?.map(v => v.value) || [],
        }
      : null,
    };

    res.send(response);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const GetProductDetails = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = req.params.userId ? Number(req.params.userId) : 0;

    const repository = AppDataSource.getRepository(Product);

    /* ================= PRODUCT ================= */
    const productResult = await repository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.productImages", "productImages")

      .leftJoinAndSelect("product.variantType", "variantType")

      /* ================= VARIANT VALUES ================= */
      .leftJoinAndSelect(
        "variantType.variantValues",
        "variantValues",
        "variantValues.active = 1"
      )


      /* ================= WISHLIST ================= */
      .leftJoin(
        "productwishlist",
        "wishlist",
        "wishlist.product_ID = product.id AND wishlist.user_ID = :userId",
        { userId }
      )

      /* ================= CART ================= */
      .leftJoin(
        "productaddtocart",
        "cart",
        "cart.product_ID = product.id AND cart.user_ID = :userId",
        { userId }
      )

      /* ================= FILTER ================= */
      .where("product.id = :id", { id })
      .andWhere("product.active = :active", { active: 1 })

      /* ================= FLAGS ================= */
      .addSelect(
        `CASE WHEN wishlist.productwishlist_ID IS NOT NULL THEN 1 ELSE 0 END`,
        "isWishlisted"
      )
      .addSelect("wishlist.productwishlist_ID", "productwishlist_ID")

      .addSelect(
        `CASE WHEN cart.productaddtocart_ID IS NOT NULL THEN 1 ELSE 0 END`,
        "isAddedToCart"
      )
      .addSelect("cart.productaddtocart_ID", "productaddtocart_ID")
      .addSelect("cart.quantity", "cartQuantity")

      .getRawAndEntities();

    /* ================= NOT FOUND ================= */
    if (!productResult.entities.length) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const entity = productResult.entities[0];
    const raw = productResult.raw[0];

    const product = {
      ...entity,
      category_name: entity.category?.name || null,
      category_image: entity.category?.image || null,
      category_imagealt: entity.category?.imagealt || null,

      isWishlisted: raw?.isWishlisted || 0,
      productwishlist_ID: raw?.productwishlist_ID || null,

      isAddedToCart: raw?.isAddedToCart || 0,
      productaddtocart_ID: raw?.productaddtocart_ID || null,
      quantity: raw?.cartQuantity || 0,
      variant: entity.variantType
      ? {
          variant: entity.variantType.variant,
          values: entity.variantType.variantValues?.map(v => v.value) || [],
        }
      : null,
    };

    /* ================= REVIEWS ================= */
    const reviews = await AppDataSource
      .getRepository(ProductReview)
      .createQueryBuilder("review")
      .leftJoin("review.user", "user")
      .select([
        "review.review_ID AS review_ID",
        "review.rating AS rating",
        "review.review AS review",
        "review.created_at AS created_at",
        "user.name AS user_name",
      ])
      .where("review.product_ID = :id", { id })
      .orderBy("review.created_at", "DESC")
      .getRawMany();

    /* ================= RATING STATS ================= */
    const ratingRaw = await AppDataSource
      .getRepository(ProductReview)
      .createQueryBuilder("review")
      .select("AVG(review.rating)", "averageRating")
      .addSelect("COUNT(review.review_ID)", "totalReviews")

      .addSelect(`SUM(CASE WHEN review.rating = 5 THEN 1 ELSE 0 END)`, "fiveStar")
      .addSelect(`SUM(CASE WHEN review.rating = 4 THEN 1 ELSE 0 END)`, "fourStar")
      .addSelect(`SUM(CASE WHEN review.rating = 3 THEN 1 ELSE 0 END)`, "threeStar")
      .addSelect(`SUM(CASE WHEN review.rating = 2 THEN 1 ELSE 0 END)`, "twoStar")
      .addSelect(`SUM(CASE WHEN review.rating = 1 THEN 1 ELSE 0 END)`, "oneStar")

      .where("review.product_ID = :id", { id })
      .getRawOne();

    const ratingStats = {
      averageRating: Number(ratingRaw?.averageRating || 0).toFixed(1),
      totalReviews: Number(ratingRaw?.totalReviews || 0),

      5: Number(ratingRaw?.fiveStar || 0),
      4: Number(ratingRaw?.fourStar || 0),
      3: Number(ratingRaw?.threeStar || 0),
      2: Number(ratingRaw?.twoStar || 0),
      1: Number(ratingRaw?.oneStar || 0),
    };

    /* ================= RELATED PRODUCTS ================= */
    const relatedProducts = await repository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.productImages", "productImages")

      /* wishlist */
      .leftJoin(
        "productwishlist",
        "wishlist",
        "wishlist.product_ID = product.id AND wishlist.user_ID = :userId",
        { userId }
      )

      /* cart */
      .leftJoin(
        "productaddtocart",
        "cart",
        "cart.product_ID = product.id AND cart.user_ID = :userId",
        { userId }
      )

      .where("product.categoryId = :categoryId", {
        categoryId: entity.category?.id,
      })
      .andWhere("product.id != :id", { id })
      .andWhere("product.active = :active", { active: 1 })

      /* FLAGS */
      .addSelect(
        `CASE WHEN wishlist.productwishlist_ID IS NOT NULL THEN 1 ELSE 0 END`,
        "isWishlisted"
      )
      .addSelect("wishlist.productwishlist_ID", "productwishlist_ID")

      .addSelect(
        `CASE WHEN cart.productaddtocart_ID IS NOT NULL THEN 1 ELSE 0 END`,
        "isAddedToCart"
      )
      .addSelect("cart.productaddtocart_ID", "productaddtocart_ID")
      .addSelect("cart.quantity", "cartQuantity")

      .orderBy("RAND()")
      .limit(8)
      .getRawAndEntities();

    /* ================= RESPONSE ================= */
    return res.json({
      product,
      reviews,
      ratingStats,
      relatedProducts,
    });

  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const removeCart = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.productid);
    const userId = Number(req.params.userid);

    if (!productId && !userId) {
      return res.status(400).json({
        status: false,
        message: "productcart_ID is required",
      });
    }

    const cartRepo = AppDataSource.getRepository(ProductAddToCart);

    //Direct delete (best way)
    const result = await cartRepo.delete({
      product_ID: productId,
      User_ID: userId,
    });

    if (result.affected === 0) {
      return res.status(404).json({
        status: false,
        message: "Unable to delete cart",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Item removed from cart",
    });
  } catch (error: any) {
    console.error("Remove Cart Error:", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};