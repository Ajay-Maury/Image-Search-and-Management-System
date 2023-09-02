import axios from "axios";
import { config } from "../../config/config";
import { getTokenHeader } from "../../utils/utils";
import { IImageDataResponse } from "./ImageDetailView.interface";

export async function getImageDataById(Id: string): Promise<IImageDataResponse> {
    const { data } = await axios.get(`${config.IMAGE_SEARCH_SERVICE_URL}/api//image-by-id/${Id}`,
        { headers: getTokenHeader() }
    )
    return { ...data, status: true }
}