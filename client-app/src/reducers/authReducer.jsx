import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { SIGNUP, LOGIN, UPDATE_PROFILE } from '../consts/apiRoute';

const initialState = {
    loading: false,
    error: false,
    authData: JSON.parse(localStorage.getItem('authData')),
    errorMessage: '',
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state, action) => {
            localStorage.removeItem('authData');
            state.authData = null;
        }
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
        builder.addCase(logIn.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(logIn.fulfilled, (state, action) => {
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
        builder.addCase(updateProfile.pending, (state, action) => {
            state.upload = true;
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.upload = false;
            const { error, errorMessage, authData } = action.payload;
            state.error = error;
            state.errorMessage = errorMessage;
            state.authData = authData;
            localStorage.setItem('authData', JSON.stringify(authData))
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

export const updateProfile = createAsyncThunk('updateProfile',
    async ({ userId, formData }, thunkApi) => {
        try {
            const response = await axios.put(`${UPDATE_PROFILE}/${userId}`, formData)
            return { error: false, authData: response.data }
        } catch (ex) {
            return { error: true, errorMessage: ex.response.data.message }
        }
    })


export const { logOut } = authReducer.actions;
export default authReducer.reducer;