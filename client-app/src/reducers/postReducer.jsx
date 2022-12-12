import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { UPLOAD_IMAGE } from "../consts/apiRoute";

const initialState = {
    postData: [],
    uploading: false,
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
                state.postData = state.postData.concat(data);
            }
        })
    }
})

export const sharePost = createAsyncThunk('sharePost', async (data, thunkApi) => {
    try {
        const response = await axios.post(UPLOAD_IMAGE, data)
        return { error: false, data: response.data }
    } catch (ex) {
        return { error: true, errorMessage: ex.message }
    }
});

export default postReducer.reducer;