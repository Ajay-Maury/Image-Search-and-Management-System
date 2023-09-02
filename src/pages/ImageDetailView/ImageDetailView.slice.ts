import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../../store/store";
import { IImageDetailViewState } from "./ImageDetailView.interface";
import { getImageDataById } from "./ImageDetailView.api";


const initialState :IImageDetailViewState= {
data:{},
loader:"idle",
message:""
}


export const getImageDataByIdAsync = createAsyncThunk(
    'image/getImageDataByIdAsync',
    async (Id:string)=>{
        return getImageDataById(Id)
    }
)

const imageDetailViewSlice = createSlice({
    name:"image_list",
    initialState,
    reducers:{
        setState: (state, payload) => {
            const { key, value } = payload.payload;
            _.update(state, `${key}`, () => value);
        },
    },
    extraReducers: builder =>{
        builder
        .addCase(getImageDataByIdAsync.pending,state=>{
            state.loader = "loading"
        })
        .addCase(getImageDataByIdAsync.fulfilled,(state,action)=>{
            state.loader = "success";
            state.data = _.get(action,"payload.image",{});
        })
        .addCase(getImageDataByIdAsync.rejected,(state)=>{
            state.loader = "failed"
            state.message = "Something went wrong"
        })
    }
})

export  const {setState} = imageDetailViewSlice.actions
export const selectImageDetailViewState = (state:RootState):IImageDetailViewState => state.image_detail_view
export default imageDetailViewSlice.reducer