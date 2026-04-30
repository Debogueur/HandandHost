import express, { Request, Router } from "express";
import {  Register, Login, ForgotPassword} from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/user.controller";
import { Permissions } from "./controller/permission.controller";
import { CreateRole, DeleteRole, GetRole, Roles, UpdateRole } from "./controller/role.controller";
import { CreateProduct,  GetProduct, GetOneProduct, Products,  GetProductDetails, removeCart} from "./controller/product.controller";
import { CreateCategory, DeleteCategory, GetCategory, Categories, UpdateCategory } from "./controller/category.controller";
import { HomeBanner } from "./controller/home.controller";
import { subcategorylist } from "./controller/home.controller";
import { Homeproduct } from "./controller/home.controller";
import { AddProductToWishlist, RemoveProductFromWishlist, GetWishlistProducts } from "./controller/wishlist.controller";
// import { ActiveCertificates } from "./controller/certificates.controller";
import { ActiveCertificates} from "./controller/certificates.controller";
import { getMainPageReviews} from "./controller/productreview.controller";
import { AddProductToCart, GetCartProducts } from "./controller/addtocart.controller";

import { Upload } from "./controller/image.controller";
import { Chart, Export, Orders } from "./controller/order.controller";
import { PermissionMiddleware } from "./middleware/permission.middleware";


export const routes = (router: Router) => {

    // authentication
    router.post('/api/register', Register);
    // router.post('/api/login', Login);
    // router.get('/api/user', AuthMiddleware, AuthenticatedUser);
    // router.post('/api/logout', AuthMiddleware, Logout);
    // router.put('/api/users/info', AuthMiddleware, UpdateInfo);
    // router.put('/api/users/password', AuthMiddleware, UpdatePassword);

    // user
    // router.get('/api/users', AuthMiddleware, PermissionMiddleware('users'), Users);
    // router.post('/api/users', AuthMiddleware, PermissionMiddleware('users'), CreateUser);
    // router.get('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), GetUser);
    // router.put('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), UpdateUser);
    // router.delete('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), DeleteUser);

    // permission
    // router.get('/api/permissions', AuthMiddleware, Permissions);

    // // role
    // router.get('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), Roles);
    // router.post('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), CreateRole);
    // router.get('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), GetRole);
    // router.put('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), UpdateRole);
    // router.delete('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), DeleteRole);

    // // products
    // router.get('/api/products', AuthMiddleware, PermissionMiddleware('products'), Products);
    // router.post('/api/products', AuthMiddleware, PermissionMiddleware('products'), CreateProduct);
    // router.get('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), GetProduct);
    // router.put('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), UpdateProduct);
    // router.delete('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), DeleteProduct);


    // // category
    // router.get('/api/categories', AuthMiddleware, PermissionMiddleware('categories'), Categories);
    // router.post('/api/categories', AuthMiddleware, PermissionMiddleware('categories'), CreateCategory);
    // router.get('/api/categories/:id', AuthMiddleware, PermissionMiddleware('categories'), GetCategory);
    // router.put('/api/categories/:id', AuthMiddleware, PermissionMiddleware('categories'), UpdateCategory);
    // router.delete('/api/categories/:id', AuthMiddleware, PermissionMiddleware('categories'), DeleteCategory);

    // // image
    // router.post('/api/upload', AuthMiddleware, Upload);
    // router.use('/api/uploads', express.static('./uploads'));

    // // orders
    // router.get('/api/orders', AuthMiddleware, Orders);
    // router.get('/api/export', AuthMiddleware, Export)
    // router.get('/api/chart', AuthMiddleware, Chart);

    /*****************Website****************************** */
    router.get('/api/homebanner', HomeBanner);
    router.get('/api/subcategorylist', subcategorylist);
    router.get('/api/homeproduct', Homeproduct);


    router.post('/api/add-to-wishlist', AddProductToWishlist);
    router.delete("/api/remove-wishlist/:id",RemoveProductFromWishlist);

    router.get('/api/product-review', getMainPageReviews);

    router.post('/api/add-to-cart', AddProductToCart);

    router.get('/api/get-wishlist/:userId', GetWishlistProducts);


    router.get('/api/get-cart/:userId', GetCartProducts);
    


    router.get('/api/home/products_detail/:id/:userId', GetOneProduct);

    router.get('/api/products-detail/:id/:userId', GetProductDetails);


    router.post('/api/register', Register);

    router.post('/api/login', Login);

    router.post('/api/forget-password', ForgotPassword);

    router.get('/api/certificates', ActiveCertificates); // certificates

    router.delete("/api/remove-cart/:productid/:userid", removeCart);

}