import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IImageListState, IPaginationAndSearchQuery } from "./ImageList.interface";
import _ from "lodash";
import { RootState } from "../../store/store";
import { getImagesData } from "./ImageList.api";

const initialState :IImageListState= {
imagesData:[],
loader:"idle",
message:"",
totalDocuments:0
}


export const getImageListDataAsync = createAsyncThunk(
    'image/getImageListDataAsync',
    async (paginationQuery:IPaginationAndSearchQuery)=>{
        return getImagesData(paginationQuery)
    }
)

const imageListSlice = createSlice({
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
        .addCase(getImageListDataAsync.pending,state=>{
            state.loader = "loading"
        })
        .addCase(getImageListDataAsync.fulfilled,(state,action)=>{
            const {data,totalCount} =action.payload
            state.loader = "success";
            state.imagesData = data;
            state.totalDocuments = totalCount;
        })
        .addCase(getImageListDataAsync.rejected,(state,action)=>{
            state.loader = "failed"
        })
    }
})

export  const {setState} = imageListSlice.actions
export const selectImageListState = (state:RootState):IImageListState => state.image_list
export default imageListSlice.reducer