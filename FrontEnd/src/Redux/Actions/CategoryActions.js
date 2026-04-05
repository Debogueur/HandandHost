import axios from 'axios';
import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAIL,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    FETCH_CATEGORY_DETAILS_REQUEST,
    FETCH_CATEGORY_DETAILS_SUCCESS,
    FETCH_CATEGORY_DETAILS_FAIL
} from '../Constants/CategoryConstants';

const API_URL = 'http://40.192.14.4:8000/api';

// Helper to get config
const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

// 1. Get all categories
export const getCategories = () => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/Categories`, getAuthConfig());
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: FETCH_CATEGORIES_FAIL,
            payload: error.response?.data?.message || error.message
        });
    }
};

// 2. Get Single Category Details (Updated to use your constants and API_URL)
export const getCategoryDetails = (id) => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORY_DETAILS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/Categories/${id}`, getAuthConfig());

        // Consistent with your other actions, extracting data.data
        const item = data.data || data;

        dispatch({
            type: FETCH_CATEGORY_DETAILS_SUCCESS,
            payload: item
        });
    } catch (error) {
        dispatch({
            type: FETCH_CATEGORY_DETAILS_FAIL,
            payload: error.response?.data?.message || error.message
        });
    }
};

// 3. Update Category
export const updateCategory = (id, categoryData) => async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    try {
        const { data } = await axios.put(`${API_URL}/Categories/${id}`, categoryData, getAuthConfig());

        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data.data });
        return { success: true };
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message
        });
        return { success: false, error: error.message };
    }
};

// 4. Create Category
export const createCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/Categories`, categoryData, getAuthConfig());

        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data.data });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message
        });
        return { success: false, error: error.message };
    }
};

// 5. Delete Category
export const removeCategory = (id) => async (dispatch) => {
    try {
        // Updated path to include '/Categories/'
        await axios.delete(`${API_URL}/Categories/${id}`, getAuthConfig());
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message
        });
    }
};