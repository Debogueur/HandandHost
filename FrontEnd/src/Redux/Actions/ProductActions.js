import axios from 'axios';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    FETCH_PRODUCT_DETAILS_REQUEST,
    FETCH_PRODUCT_DETAILS_SUCCESS,
    FETCH_PRODUCT_DETAILS_FAIL
} from '../Constants/ProductConstants';

const API_URL = 'http://localhost:8000/api';

// Helper to get config
const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

// 1. Get all products
export const getProducts = (page = 1, filters = {}) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        // Build query string: ?page=1&categoryId=3&minPrice=100...
        const queryParams = new URLSearchParams({ page, ...filters }).toString();
        const { data } = await axios.get(`${API_URL}/Products?${queryParams}`, getAuthConfig());

        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: data // This contains { data: [...], meta: {...} }
        });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAIL, payload: error.message });
    }
};

// 2. Get Single Product Details
export const getProductDetails = (id) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_DETAILS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/Products/${id}`, getAuthConfig());

        const item = data.data || data;

        dispatch({
            type: FETCH_PRODUCT_DETAILS_SUCCESS,
            payload: item
        });
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCT_DETAILS_FAIL,
            payload: error.response?.data?.message || error.message
        });
    }
};

// 3. Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        const { data } = await axios.put(`${API_URL}/Products/${id}`, productData, getAuthConfig());

        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.data });
        return { success: true };
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response?.data?.message || error.message
        });
        return { success: false, error: error.message };
    }
};

// 4. Create Product
export const createProduct = (productData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/Products`, productData, getAuthConfig());

        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.data });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response?.data?.message || error.message
        });
        return { success: false, error: error.message };
    }
};

// 5. Delete Product
export const removeProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/Products/${id}`, getAuthConfig());
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response?.data?.message || error.message
        });
    }
};