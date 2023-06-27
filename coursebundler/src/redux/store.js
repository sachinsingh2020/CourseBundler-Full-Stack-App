import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./reducers/adminReducer";
import { courseReducer } from "./reducers/courseReducer";
import { otherReducer } from "./reducers/otherReducer";
import { profileReducer, subscriptionReducer, userReducer } from "./reducers/userReducer";


const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        courses: courseReducer,
        subscription: subscriptionReducer,
        admin: adminReducer,
        other: otherReducer
    }
});

export default store;

export const server = "https://testing-server-5.vercel.app/api/v1";
