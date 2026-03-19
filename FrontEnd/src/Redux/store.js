import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers/index'; // Import the file above

export const store = configureStore({
    reducer: rootReducer // Pass the combined reducers here
});