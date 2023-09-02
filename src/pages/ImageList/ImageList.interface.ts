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
    dimensions: string;
    size: number;
    keywords: string[];
    tags: string[];
    uploadedAt: string;
}

export interface IGetImageData {
    data: IImageData[];
    totalCount: number;
}