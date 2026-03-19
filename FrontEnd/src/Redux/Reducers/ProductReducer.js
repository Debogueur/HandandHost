import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    DELETE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    FETCH_PRODUCT_DETAILS_REQUEST,
    FETCH_PRODUCT_DETAILS_SUCCESS,
    FETCH_PRODUCT_DETAILS_FAIL
} from '../Constants/ProductConstants';

const initialState = {
    list: [],
    selectedProduct: null, // Holds details for the product being edited
    loading: false,
    error: null
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        // REQUESTS: Handle loading states for all async actions
        case FETCH_PRODUCTS_REQUEST:
        case FETCH_PRODUCT_DETAILS_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        // FETCH ALL: Populate the product list
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.payload,
                error: null
            };

        // FETCH SINGLE: Store details for the edit form
        case FETCH_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedProduct: action.payload
            };

        // CREATE: Add the new product to the existing list immediately
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload]
            };

        // UPDATE: Find the specific product in the list and replace it with updated data
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                list: state.list.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                selectedProduct: action.payload // Keep the edit form in sync
            };

        // DELETE: Filter out the deleted product from the local state
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                list: state.list.filter((item) => item.id !== action.payload)
            };

        // FAILS: Catch and store error messages
        case FETCH_PRODUCTS_FAIL:
        case FETCH_PRODUCT_DETAILS_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};