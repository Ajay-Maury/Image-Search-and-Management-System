import axios from "axios";
import { config } from "../../config/config";
import { IGetImageData } from "./ImageList.interface";


const localStorageData = JSON.parse(localStorage.getItem('persist:userToken') || "");
const token = localStorageData ?  localStorageData?.token || "" : "";
const headers = {
    Authorization: `Bearer ${token.substring(1, token.length - 1)}`,
  };

export async function getImagesData():Promise<IGetImageData>{
    const {data} = await axios.get(`${config.IMAGE_SEARCH_SERVICE_URL}/api/image/search`,
    {headers}
    )
    return data
}