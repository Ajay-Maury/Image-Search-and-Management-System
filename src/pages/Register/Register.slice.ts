import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRegisterUserState, IRegisterValues } from "./Register.interface";
import { registerUser } from "./Register.api";
import _ from "lodash";
import { RootState } from "../../store/store";

const initialState: IRegisterUserState = {
    errorMessage: "",
    loader: "idle",
    successMessage: "",
}

export const registerUserAsync = createAsyncThunk(
    'user/registerUserAsync',
    async (data: IRegisterValues) => {
        return await registerUser(data)
    }
)

export const registerUserSlice = createSlice({
    name: "register_user",
    initialState,
    reducers: {
        setState: (state, payload) => {
            const { key, value } = payload.payload;
            _.update(state, `${key}`, () => value);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUserAsync.pending, state => {
                state.loader = "loading"
            })
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                const { message = "", status = false } = action.payload
                if (status) {
                    state.successMessage = message
                    state.loader = "success"
                } else {
                    state.errorMessage = message
                    state.loader = "failed"
                }
            })
            .addCase(registerUserAsync.rejected, (state) => {
                state.loader = "failed"
            })
    }
})

export const { setState } = registerUserSlice.actions;

export const selectRegisterUSer = (state: RootState): IRegisterUserState => state.register_user;

export default registerUserSlice.reducer;