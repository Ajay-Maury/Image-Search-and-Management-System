import { LoaderStatus } from "../../utils/utils";

export interface IImageSaveState{
    title:string;
    description:string;
    uploadResponse: IUploadResponse;
    keywords: string;
    loader:LoaderStatus;
}

export interface IUploadResponse{
    width:number;
    height:number;
    bytes:number;
    secure_url:string;
}

export interface ISavePayload{
    title :string;
    description :string;
    keywords?:string;
    imageUrl:string
    size:number;
    height:number;
    width:number;
}