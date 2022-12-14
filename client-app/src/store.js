import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        user: userReducer,
    }
})