import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../Constants/UserConstants';

export const login = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const API_URL = process.env.REACT_APP_API_URL;
        const { data } = await axios.post(`${API_URL}/api/login`, credentials);

        // Check if data exists and the login was successful
        if (data && data.success) {

            // 1. Dispatch to Redux (data.user is already an object)
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data.user
            });

            // 2. Persist to LocalStorage
            // Use JSON.stringify only when SAVING to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data.user));

            // 3. Access properties directly (No need to JSON.parse data.user!)
            const username = data.user?.username || data.user?.name;
            const email = data.user?.email;

            if (username) localStorage.setItem('username', username);
            if (email) localStorage.setItem('email', email);

            console.log("Login Successful for:", email);
            return { success: true };
        } else {
            // Handle case where status is 200 but success is false
            const msg = data?.message || "Login failed";
            dispatch({ type: USER_LOGIN_FAIL, payload: msg });
            return { success: false, message: msg };
        }

    } catch (error) {
        const message = error.response?.data?.message || error.message;
        console.error("Login Error:", message);

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: message
        });
        return { success: false, message };
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};