import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    darkMode: '',
    highcontrast: '',
    openmodal: false,
    openhelp: false,
    rtlmode: false,
    gradient: '',
    addimage: '',
    imgvalidation: ''
};

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setUseremail: (state, action) => {
            state.email = action.payload;
        },
        setOpenModal: (state, action) => {
            state.openmodal = action.payload;
        },
        setSecond: (state, action) => {
            state.second = action.payload;
        },
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
        },
        setHighContrast: (state, action) => {
            state.highcontrast = action.payload;
        },
        setGradientColor: (state, action) => {
            state.gradient = action.payload;
        },
        setAddImage: (state, action) => {
            state.addimage = action.payload;
        },
        setImageValidation: (state, action) => {
            state.imgvalidation = action.payload || 'it is more then 10 mb';
        },
        setRTLMode: (state, action) => {
            state.rtlmode = action.payload;
        }
    }
});

export const {
    setUsername,
    setUseremail,
    setOpenModal,
    setSecond,
    setDarkMode,
    setHighContrast,
    setGradientColor,
    setAddImage,
    setImageValidation,
    setRTLMode
} = mainSlice.actions;

export default mainSlice.reducer;