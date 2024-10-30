import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import companyReducer from './companySlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        company: companyReducer
    }
})
export default store;