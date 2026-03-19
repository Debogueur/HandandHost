import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    FETCH_CATEGORY_DETAILS_REQUEST,
    FETCH_CATEGORY_DETAILS_SUCCESS,
    FETCH_CATEGORY_DETAILS_FAIL
} from '../Constants/CategoryConstants';

// 1. Ensure this object has the "list" property
const initialState = {
    list: [],
    selectedCategory: null, // New field for Edit mode
    loading: false,
    error: null
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null // Clear previous errors on new attempt
            };

        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.payload
            };

        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                // Ensure 'id' matches your object property name
                list: state.list.filter((item) => item.id !== action.payload)
            };

        // If you add a FAIL constant later, it would look like this:
        case 'FETCH_CATEGORIES_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case FETCH_CATEGORY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedCategory: action.payload
            };

        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload] // Add the new category to the UI list
            };

        case UPDATE_CATEGORY_REQUEST:
            return { ...state, loading: true, error: null };

        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                list: state.list.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                )
            };

        case UPDATE_CATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};