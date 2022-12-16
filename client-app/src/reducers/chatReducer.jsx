import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_MESSAGES, USER_CHATS } from '../consts/apiRoute';

const initialState = {
    loading: false,
    chatData: [],
    messages: [],
    error: false,
    errorMessage: false
}

const chatReducer = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(userChats.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(userChats.fulfilled, (state, action) => {
            state.loading = false;
            const { error, errorMessage, data } = action.payload;
            if (!error) {
                state.chatData = data
            } else {
                state.errorMessage = errorMessage;
            }
        })
        builder.addCase(getMessages.fulfilled, (state, action) => {
            const { error, errorMessage, messages } = action.payload;
            if (!error) {
                state.messages = messages;
            } else {
                state.errorMessage = errorMessage;
            }
        })
    }
})

export const userChats = createAsyncThunk('userChats',
    async (userId, thunkApi) => {
        const token = thunkApi.getState()?.auth?.authData?.token ?? '';
        try {
            const response = await axios.get(`${USER_CHATS}/${userId}`, {
                headers: {
                    Authorization: token
                }
            })
            return { error: false, data: response.data }
        } catch (ex) {
            if (ex.response?.status.toString() == '401') {
                return { error: true, errorMessage: '401' }
            }
            return { error: true, errorMessage: ex.message }
        }
    })

export const getMessages = createAsyncThunk('getMessages',
    async (chatId, thunkApi) => {
        try {
            const token = getToken(thunkApi);
            const response = await axios.get(`${GET_MESSAGES}/${chatId}`, {
                headers: {
                    Authorization: token
                }
            })

            return { error: false, messages: response.data }
        } catch (ex) {
            if (ex.response?.status.toString() == '401') {
                return { error: true, errorMessage: '401' }
            }
            return { error: true, errorMessage: ex.message }
        }
    })

const getToken = (thunkApi) => thunkApi.getState()?.auth?.authData?.token ?? '';


export default chatReducer.reducer;