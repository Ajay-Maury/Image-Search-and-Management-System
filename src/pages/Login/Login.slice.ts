import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginUserState, ILoginValues } from "./Login.interface";
import _ from "lodash";
import { RootState } from "../../store/store";
import { loginUser } from "./Login.api";

const initialState: ILoginUserState = {
    loader: "idle",
    message: {
        message: "",
        type: "",
    },
    token: ""
}

export const loginUserAsync = createAsyncThunk(
    'user/loginUserAsync',
    async (payload: ILoginValues) => {
        return await loginUser(payload)
    }
)


export const loginUserSlice = createSlice({
    name: "login_user",
    initialState,
    reducers: {
        setState: (state, payload) => {
            const { key, value } = payload.payload;
            _.update(state, `${key}`, () => value);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginUserAsync.pending, state => {
                state.loader = "loading"
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                const { message, status = false, token = "" } = action.payload
                if (status) {
                    state.loader = "success"
                    state.token = token;
                    state.message = {
                        type: "success",
                        message
                    }
                } else {
                    state.loader = "failed"
                    state.message = {
                        type: "error",
                        message
                    }
                }
            })
            .addCase(loginUserAsync.rejected, (state) => {
                state.loader = "failed"
                state.message = {
                    type: "error",
                    message: "Something went wrong"
                }
            })
    }
})

export const { setState } = loginUserSlice.actions
export const selectLoginUSerState = (state: RootState): ILoginUserState => state.user
export default loginUserSlice.reducer