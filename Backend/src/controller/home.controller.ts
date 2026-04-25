import { Request, Response } from "express";
import { Home } from "../entity/home.entity";
import { Category } from "../entity/category.entity";
import { Product } from "../entity/product.entity";

import { Wishlist } from "../entity/wishlist.entity";
import { ProductAddToCart } from "../entity/addtocart.entity"; // if exists
import { AppDataSource } from "../core/database-config";



// 2. Get Category Tree (Nested JSON structure)
export const HomeBanner = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.query.id as string);
        const repository = AppDataSource.getRepository(Home);

        const data = await repository
        .createQueryBuilder("banner") //alias (NOT table name)
        .where("banner.B_Active = :active", { active: 1 })
        .getMany();

        res.send(data );
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const subcategorylist = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const repository = AppDataSource.getRepository(Category);

        const data = await repository
        .createQueryBuilder("subcategory") //alias (NOT table name)
        .where("subcategory.active = :active", { active: 1 })
        .andWhere("subcategory.parentId IS NOT NULL")
        .getMany();

        res.send(data );
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};



// export const Homeproduct = async (req: Request, res: Response) => {
//     try {
//         const id = parseInt(req.params.id);
//         const repository = AppDataSource.getRepository(Product);

//        const data = await repository
//         .createQueryBuilder("product")
//         // .innerJoin(
//         //     "productimages", 
//         //     "pi",           
//         //     "pi.productId = product.id"
//         // )
//         .where("product.active = :active", { active: 1 })
//         .getMany();

//         res.send(data );
//     } catch (error: any) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export const Homeproduct = async (req: Request, res: Response) => {
//   try {
//     const repository = AppDataSource.getRepository(Product);

//     const userId = req.query.userid ? Number(req.query.userid) : null;

//     const query = repository
//       .createQueryBuilder("product")
//       .where("product.active = :active", { active: 1 });

//     if (userId) {
//       query
//         .leftJoin(
//           "productwishlist",
//           "wishlist",
//           "wishlist.product_ID = product.id AND wishlist.user_ID = :userId",
//           { userId }
//         )
//         .leftJoin(
//           "productaddtocart",
//           "cart",
//           "cart.product_ID = product.id AND cart.user_ID = :userId",
//           { userId }
//         )
//         .addSelect(
//           "CASE WHEN wishlist.productwishlist_ID IS NOT NULL THEN 1 ELSE 0 END",
//           "isWishlisted"
//         )
//         .addSelect(
//           "wishlist.productwishlist_ID",
//           "productwishlist_ID"
//         )
//         .addSelect(
//           "CASE WHEN cart.productaddtocart_ID IS NOT NULL THEN 1 ELSE 0 END",
//           "isAddedToCart"
//         );

//       const raw = await query.getRawAndEntities();

//       const result = raw.entities.map((item, index) => ({
//         ...item,
//         isWishlisted: raw.raw[index].isWishlisted,
//         productwishlist_ID: Number(raw.raw[index].productwishlist_ID) || 0,
//         isAddedToCart: raw.raw[index].isAddedToCart,
//       }));

//       return res.send(result);
//     }

//     const data = await query.getMany();

//     const result = data.map((item) => ({
//       ...item,
//       isWishlisted: 0,
//       isAddedToCart: 0,
//     }));

//     res.send(result);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const Homeproduct = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const repository =
//       AppDataSource.getRepository(Product);

//     const userId = req.query.userid
//       ? Number(req.query.userid)
//       : null;

//     const query = repository
//       .createQueryBuilder("product")
//       .where("product.active = :active", {
//         active: 1,
//       });

//     if (userId) {
//       query
//         .leftJoin(
//           "productwishlist",
//           "wishlist",
//           `
//           wishlist.product_ID = product.id
//           AND wishlist.user_ID = :userId
//           `,
//           { userId }
//         )
//         .leftJoin(
//           "productaddtocart",
//           "cart",
//           `
//           cart.product_ID = product.id
//           AND cart.user_ID = :userId
//           `,
//           { userId }
//         )
//         .addSelect(
//           `
//           CASE
//           WHEN wishlist.productwishlist_ID
//           IS NOT NULL
//           THEN 1 ELSE 0 END
//           `,
//           "isWishlisted"
//         )
//         .addSelect(
//           "wishlist.productwishlist_ID",
//           "productwishlist_ID"
//         )
//         .addSelect(
//           `
//           CASE
//           WHEN cart.productaddtocart_ID
//           IS NOT NULL
//           THEN 1 ELSE 0 END
//           `,
//           "isAddedToCart"
//         );

//       const raw =
//         await query.getRawAndEntities();

//       const result =
//         raw.entities.map(
//           (item, index) => ({
//             ...item,
//             isWishlisted: Number(
//               raw.raw[index]
//                 .isWishlisted
//             ),
//             productwishlist_ID:
//               Number(
//                 raw.raw[index]
//                   .productwishlist_ID
//               ) || 0,
//             isAddedToCart: Number(
//               raw.raw[index]
//                 .isAddedToCart
//             ),
//           })
//         );

//       return res.send(result);
//     }

//     const data = await query.getMany();

//     const result = data.map(
//       (item) => ({
//         ...item,
//         isWishlisted: 0,
//         productwishlist_ID: 0,
//         isAddedToCart: 0,
//       })
//     );

//     res.send(result);
//   } catch (error: any) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };





export const Homeproduct = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSource.getRepository(Product);

    const userId = req.query.userid ? Number(req.query.userid) : null;

    const query = repository
      .createQueryBuilder("product")
      .where("product.active = :active", { active: 1 });

    if (userId) {
      query
        /* ================= WISHLIST ================= */
        .leftJoin(
          Wishlist,
          "wishlist",
          `wishlist.product_ID = product.id 
           AND wishlist.User_ID = :userId`,
          { userId }
        )

        /* ================= CART ================= */
        .leftJoin(
          ProductAddToCart,
          "cart",
          `cart.product_ID = product.id 
           AND cart.User_ID = :userId`,
          { userId }
        )

        /* ================= FLAGS ================= */
        .addSelect(
          `CASE WHEN wishlist.productwishlist_ID IS NOT NULL THEN 1 ELSE 0 END`,
          "isWishlisted"
        )
        .addSelect(
          "wishlist.productwishlist_ID",
          "productwishlist_ID"
        )
        .addSelect(
          `CASE WHEN cart.productaddtocart_ID IS NOT NULL THEN 1 ELSE 0 END`,
          "isAddedToCart"
        )
        .addSelect(
          "cart.productaddtocart_ID",
          "productaddtocart_ID"
        );

      const raw = await query.getRawAndEntities();

      const result = raw.entities.map((item, index) => ({
        ...item,
        isWishlisted: Number(raw.raw[index].isWishlisted || 0),
        productwishlist_ID: Number(raw.raw[index].productwishlist_ID || 0),
        isAddedToCart: Number(raw.raw[index].isAddedToCart || 0),
        productaddtocart_ID: Number(raw.raw[index].productaddtocart_ID || 0),
      }));

      return res.send(result);
    }

    const data = await query.getMany();

    res.send(
      data.map((item) => ({
        ...item,
        isWishlisted: 0,
        productwishlist_ID: 0,
        isAddedToCart: 0,
      }))
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};