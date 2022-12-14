import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { GET_USERS } from '../consts/apiRoute';

const initialState = {
    loading: false,
    usersData: [],
    error: false,
    errorMessage: ''
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            const { usersData, error, errorMessage } = action.payload;
            if (!error) {
                state.usersData = usersData
            } else {
                state.errorMessage = errorMessage
            }
        })
    }
})

export const getUsers = createAsyncThunk('getUsers', async (_, thunkApi) => {
    try {
        const token = thunkApi.getState()?.auth?.authData?.token ?? '';
        const response = await axios.get(GET_USERS, {
            headers: {
                Authorization: token
            }
        });
        return { error: false, usersData: response.data }
    } catch (ex) {
        if (ex.response?.status.toString() == '401') {
            return { error: true, errorMessage: '401' }
        }
        return { error: true, errorMessage: ex.message }
    }
})



export default userReducer.reducer;