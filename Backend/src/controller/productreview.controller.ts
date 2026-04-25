import { Request, Response } from "express";
import { ProductReview } from "../entity/productreview.entity";

export const getMainPageReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await ProductReview.find({
      where: { postInMainPage: true },
      relations: ["product", "user"],
      order: { created_at: "DESC" },
    });

    const formattedReviews = reviews.map((review) => ({
      id: review.review_ID,
      quote: review.review,
      rating: review.rating,
      author: review.user?.first_name || "Anonymous",
    //   avatar: review.user?.avatar || "/images/default-avatar.png",
      title: review.product?.title,
      price: review.product?.discount_price,
      mainimage: review.product?.mainimage,
      alt: "product",
      product: review.product_ID, // useful for quick view
    }));

    return res.status(200).json({
      success: true,
      data: formattedReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch main page reviews",
    });
  }
};