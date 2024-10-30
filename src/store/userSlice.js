import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api = 'http://localhost:3001'

export const loginUser = createAsyncThunk(
    'users/signIn',
    async(userCredentials) => {
        const request = await axios.post(`${api}/auth/login-user`, userCredentials)
        const response = await request.data
        
        const request2 = await axios.get(`${api}/auth/profile-user`, {
            headers: {
                "Authorization": `Bearer ${response.access_token}`
            }
        })
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('user', JSON.stringify(request2.data))
        return request2.data
    }
)

export const signUpUser = createAsyncThunk(
    'users/signUp',
    async(userCredentials) => {
        const request = await axios.post(`${api}/users/signup`, userCredentials)
        const response = await request.data
        return response
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loadingUser: false,
        user: null,
        errorUser: null
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loadingUser = true;
            state.user = null;
            state.errorUser = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loadingUser = false;
            state.user = action.payload;
            state.errorUser = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loadingUser = false;
            state.user = null;
            if(action.error.message === 'Request failed with status code 404') {
                state.errorUser = 'Username not found'
            }
            else if(action.error.message === 'Request failed with status code 401') {
                state.errorUser = 'Wrong password'
            }
            else {
                state.errorUser = action.error.message;
            }
        })  
        .addCase(signUpUser.pending, (state) => {
            state.loadingUser = true;
            state.user = null;
            state.errorUser = null;
        })
        .addCase(signUpUser.fulfilled, (state, action) => {
            state.loadingUser = false;
            state.user = action.payload;
            state.errorUser = null;
        })
        .addCase(signUpUser.rejected, (state, action) => {
            state.loadingUser = false;
            state.user = null;
            state.errorUser = action.error.message; 
        })
    }

}) 
export default userSlice.reducer;