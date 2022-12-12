import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { SIGNUP, LOGIN } from '../consts/apiRoute';

const initialState = {
    loading: false,
    error: false,
    authData: localStorage.getItem('authData'),
    errorMessage: '',
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.success) {
                state.error = false;
                state.authData = action.payload.data;
                state.errorMessage = '';
            } else {
                state.error = true;
                state.authData = null;
                state.errorMessage = action.payload.message;
            }
        })
        builder.addCase(logIn.pending, (state, action)=> {
            state.loading = true;
        })
        builder.addCase(logIn.fulfilled, (state, action)=>{
            state.loading = false;
            if (action.payload.success) {
                state.error = false;
                state.authData = action.payload.data;
                state.errorMessage = '';
            } else {
                state.error = true;
                state.authData = null;
                state.errorMessage = action.payload.message;
            }
        })
    }
})

export const signUp = createAsyncThunk('singup',
    async (formData, thunkAPI) => {
        try {            
            const response = await axios.post(SIGNUP, formData);

            return { success: true, data: response.data }
        } catch (e) {
            return { success: false, message: e.response?.data?.message ?? e.message }
        }
    })

export const logIn = createAsyncThunk('login',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(LOGIN, formData);
            return { success: true, data: response.data }
        } catch (e) {
            return { success: false, message: e.response?.data?.message ?? e.message }
        }
    })



export default authReducer.reducer;