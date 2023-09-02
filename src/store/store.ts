import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import registerUserReducer from '../pages/Register/Register.slice.ts'
import loginUserReducer from '../pages/Login/Login.slice.ts'
import imageListReducer from "../pages/ImageList/ImageList.slice.ts"

const authPersistConfig = {
    key: "userToken",
    storage,
    whitelist: ["token"], // Specify the field(s) to persist
};

const rootReducer = combineReducers({
    user: persistReducer(authPersistConfig, loginUserReducer),
    register_user: registerUserReducer,
    image_list: imageListReducer
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
