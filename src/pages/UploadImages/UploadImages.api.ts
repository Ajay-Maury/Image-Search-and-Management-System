import axios from "axios";
import { ISavePayload } from "./UploadImages.interface";
import { config } from "../../config/config";
import { getTokenHeader } from "../../utils/utils";

export async function saveUploadImage(payload: ISavePayload) {
    const { data } = await axios.post(`${config.IMAGE_SEARCH_SERVICE_URL}/api/image/save`, payload,
        { headers: getTokenHeader() }
    )
    return data
}