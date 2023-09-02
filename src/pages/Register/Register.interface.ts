import { LoaderStatus } from "../../utils/utils";

export interface IRegisterValues {
    email: string;
    password: string;
}

export type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

export interface IRegisterUserState{
    errorMessage: string;
    successMessage: string;
    loader:LoaderStatus;
}