import { combineReducers } from "@reduxjs/toolkit";
import mainReducer from "./Mainreducer";
import { categoryReducer } from "./CategoryReducer";
import { userReducer } from "./UserReducer";
import { productReducer } from "./ProductReducer";


export default combineReducers({
    main: mainReducer,
    categories: categoryReducer,
    user: userReducer,
    products: productReducer
});
