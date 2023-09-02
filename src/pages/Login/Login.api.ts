import axios from "axios";
import { ILoginValues } from "./Login.interface";
import { config } from "../../config/config";
import _ from "lodash";

export async function loginUser(payload: ILoginValues): Promise<{ message: string, token?: string, status: boolean }> {
    try {
        const { data } = await axios.post(`${config.IMAGE_SEARCH_SERVICE_URL}/api/user/login`, payload)
        return data
    } catch (error) {
        console.log('error:', error)
        return { message: _.get(error, "response.data.message", "Something went wrong please try again"), status: false }
    }
}