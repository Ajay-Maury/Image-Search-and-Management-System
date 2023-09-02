import { LoaderStatus } from "../../utils/utils";

export interface IImageDetailViewState {
    data:IImageDataResponse |{} ;
    loader:LoaderStatus;
    message:string
}

export interface IImageDataResponse{
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    size: number;
    height: number;
    width: number;
    keywords: string[];
    tags: string[];
    uploadedAt: string;
    status:boolean;
    message?:string
}