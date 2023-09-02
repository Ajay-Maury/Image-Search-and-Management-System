import axios from "axios";
import { config } from "../../config/config";
import _ from "lodash";
import { IRegisterValues } from "./Register.interface";

export async function registerUser(payload: IRegisterValues): Promise<{ message: string, status: boolean }> {
    try {
        const { data } = await axios.post(`${config.IMAGE_SEARCH_SERVICE_URL}/api/user/register`, payload)
        return { ...data, status: true }
    } catch (error) {
        return { message: _.get(error, "response.data.message", "Something went wrong please try again"), status: false }
    }
}