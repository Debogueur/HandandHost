
import { 
    setAddImage, 
    setImageValidation, 
    setUsername, 
    setUseremail,
    setDarkMode, 
    setHighContrast, 
    setRTLMode, 
    setOpenModal, 
    setGradientColor
} from '../Reducers/Mainreducer';
import axios from 'axios';
console.log("All Env Vars:", process.env);

export const onChangeAddImage = (e) => (dispatch) => {
    if (e[0].size < (1 * 1024 * 1024)) {
        dispatch(setAddImage(e));
    } else {
        dispatch(setImageValidation());
    }
};


export const onChangeUsername = (e) => (dispatch) => {
    dispatch(setUsername(e));
};

export const onChangeDarkMode = (val) => (dispatch) => {
    if (val === 'dark') {
        window.document.children[0].setAttribute('data-theme', 'dark');
    } else if (val === 'high-contrast') {
        // window.document.children[0].setAttribute('data-theme', 'light')
    } else {
        window.document.children[0].setAttribute('data-theme', 'light');
    }
    
    dispatch(setDarkMode(val));
    dispatch(setHighContrast(val));
};

export const onChangeHighContrast = (val) => (dispatch) => {
    if (val === 'high-contrast') {
        window.document.children[0].setAttribute('data-theme', 'high-contrast');
    } else if (val === 'dark') {
        window.document.children[0].setAttribute('data-theme', 'light');
    } else {
        window.document.children[0].setAttribute('data-theme', 'light');
    }
    
    dispatch(setHighContrast(val));
    dispatch(setDarkMode(val));
};

export const onChangeRTLMode = (val) => (dispatch) => {
    if (document.body.classList.contains("rtl_mode")) {
        document.body.classList.remove("rtl_mode");
    } else {
        document.body.classList.add("rtl_mode");
    }

    dispatch(setRTLMode(val));
};

export const onOpenModalSetting = (val) => (dispatch) => {
    dispatch(setOpenModal(val));
};

export const onGradientColor = (val) => (dispatch) => {
    const theme = document.getElementById("mainsidemenu");
    if (theme) {
        if (!theme.classList.contains('gradient')) {
            theme.classList.add('gradient');
            dispatch(setGradientColor(true));
        } else {
            theme.classList.remove('gradient');
            dispatch(setGradientColor(false));
        }
    }
};