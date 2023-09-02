import { LoaderStatus } from "../../utils/utils";

export interface ILoginValues {
    email: string;
    password: string;
}


export type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

export interface ILoginUserState{
    token:string;
    message: {
        type: "success" | "error" | "",
        message: string,
    };
    loader: LoaderStatus;
}