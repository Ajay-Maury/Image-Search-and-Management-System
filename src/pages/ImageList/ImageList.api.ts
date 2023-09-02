import axios from "axios";
import { config } from "../../config/config";
import { IGetImageData, IPaginationAndSearchQuery } from "./ImageList.interface";
import { getTokenHeader } from "../../utils/utils";

export async function getImagesData(paginationQuery: IPaginationAndSearchQuery): Promise<IGetImageData> {
    const { limit, offset, searchText = "" } = paginationQuery
    const { data } = await axios.post(`${config.IMAGE_SEARCH_SERVICE_URL}/api/image/search`, { limit, offset, searchText },
        { headers: getTokenHeader() }
    )
    return data
}