import { LoaderStatus } from "../../utils/utils";

export interface IImageListState {
    loader: LoaderStatus;
    imagesData: IImageData[],
    totalDocuments: number;
    message: string
}

export interface IImageData {
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
}

export interface IGetImageData {
    data: IImageData[];
    totalCount: number;
}

export interface IPaginationAndSearchQuery{
    limit:number;
    offset:number;
    searchText?:string;
}