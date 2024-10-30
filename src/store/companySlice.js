import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api = 'http://localhost:3001'
export const loginCompany = createAsyncThunk(
    'companies/signIn',
    async(companyCredentials) => {
        const request = await axios.post(`${api}/auth/login-company`, companyCredentials)
        const response = await request.data
        
        const request2 = await axios.get(`${api}/auth/profile-company`, {
            headers: {
                "Authorization": `Bearer ${response.access_token}`
            }
        })
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('company', JSON.stringify(request2.data))
        return request2.data;
    }
)

export const signUpCompany = createAsyncThunk(
    'companies/signUp',
    async(companyCredentials) => {
        const request = await axios.post(`${api}/companies/signup`, companyCredentials)
        const response = await request.data
        return response
    }
)

const companySlice = createSlice({
    name: 'company',
    initialState: {
        loadingCompany: false,
        company: null,
        errorCompany: null
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginCompany.pending, (state) => {
            state.loadingCompany = true;
            state.company = null;
            state.errorCompany = null;
        })
        .addCase(loginCompany.fulfilled, (state, action) => {
            state.loadingCompany = false;
            state.company = action.payload;
            state.errorCompany = null;
        })
        .addCase(loginCompany.rejected, (state, action) => {
            state.loadingCompany = false;
            state.company = null;
            if(action.error.message === 'Request failed with status code 404') {
                state.errorCompany = 'Company not found'
            }
            else if(action.error.message === 'Request failed with status code 401') {
                state.errorCompany = 'Wrong password'
            }
            else {
                state.errorCompany = action.error.message;
            }
        })
        .addCase(signUpCompany.pending, (state) => {
            state.loadingCompany = true;
            state.company = null;
            state.errorCompany = null;
        })
        .addCase(signUpCompany.fulfilled, (state, action) => {
            state.loadingCompany = false;
            state.company = action.payload;
            state.errorCompany = null;
        })
        .addCase(signUpCompany.rejected, (state, action) => {
            state.loadingCompany = false;
            state.company = null;
            state.errorCompany = action.error.message;
        })
    }

}) 
export default companySlice.reducer;