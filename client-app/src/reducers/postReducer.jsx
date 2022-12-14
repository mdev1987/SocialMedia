import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { HOST, SHARE_POST } from "../consts/apiRoute";

const initialState = {
    postData: [],
    uploading: false,
    loading: false,
    error: false,
    errorMessage: ''
}

const postReducer = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sharePost.pending, (state, action) => {
            state.uploading = true;
        })
        builder.addCase(sharePost.fulfilled, (state, action) => {
            state.uploading = false;
            if (action.payload.error) {
                const { error, errorMessage } = action.payload;
                state.error = error;
                state.errorMessage = errorMessage;
            } else {
                const { error, data } = action.payload;
                state.error = error;
                state.errorMessage = '';
                state.postData = [data, ...state.postData];
            }
        })
        builder.addCase(getUserPosts.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getUserPosts.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                const { error, errorMessage } = action.payload;
                state.error = error;
                state.errorMessage = errorMessage;
            } else {
                const { error, data } = action.payload;
                state.error = error;
                state.errorMessage = '';
                state.postData = data;
            }
        })
        builder.addCase(likePost.fulfilled, (state, action) => {
            if (action.payload.error) {
                const { error, errorMessage } = action.payload;
                state.error = error;
                state.errorMessage = errorMessage;
            } else {
                const { error, data } = action.payload;
                state.error = error;
                state.errorMessage = '';
            }
        })
    }
})

export const sharePost = createAsyncThunk('sharePost', async (data, thunkApi) => {
    try {
        const response = await axios.post(SHARE_POST, data)
        return { error: false, data: response.data }
    } catch (ex) {
        return { error: true, errorMessage: ex.message }
    }
});

export const getUserPosts = createAsyncThunk('userPosts', async (id, thunkApi) => {
    try {
        const response = await axios.get(`${HOST}/post/${id}/posts`)
        return { error: false, data: response.data }
    } catch (ex) {
        return { error: true, errorMessage: ex.message }
    }
})

export const likePost = createAsyncThunk('likPost', async ({ postId, userId }, thunkApi) => {
    try {
        const response = await axios.post(`${HOST}/post/${postId}/like`, {
            userId: userId
        })
        return { error: false, data: response.data }
    } catch (ex) {
        return { error: true, errorMessage: ex.message }
    }
})

export default postReducer.reducer;