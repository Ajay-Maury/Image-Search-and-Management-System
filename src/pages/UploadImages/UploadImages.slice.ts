import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../../store/store";
import { IImageSaveState, ISavePayload } from "./UploadImages.interface";
import { saveUploadImage } from "./UploadImages.api";

const initialState: IImageSaveState = {
    description: "",
    keywords: "",
    title: "",
    uploadResponse: {
        bytes: 0,
        height: 0,
        secure_url: "",
        width: 0,
    },
    loader: "idle"
}


export const saveUploadImageAsync = createAsyncThunk(
    'image/saveUploadImageAsync',
    async (payload: ISavePayload) => {
        return saveUploadImage(payload)
    }
)

const imageSaveSlice = createSlice({
    name: "image_list",
    initialState,
    reducers: {
        setState: (state, payload) => {
            const { key, value } = payload.payload;
            _.update(state, `${key}`, () => value);
        },
        resetState: () => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(saveUploadImageAsync.pending, state => {
                state.loader = "loading"
            })
            .addCase(saveUploadImageAsync.fulfilled, (state) => {
                state.loader = "success";
            })
            .addCase(saveUploadImageAsync.rejected, (state) => {
                state.loader = "failed"
            })
    }
})

export const { setState, resetState } = imageSaveSlice.actions
export const selectImageUploadState = (state: RootState): IImageSaveState => state.image_upload
export default imageSaveSlice.reducer