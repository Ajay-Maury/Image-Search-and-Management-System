import axios, {
    AxiosError,
    AxiosInstance,
    // AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from "axios";
  
  
  const onRequest = async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    try {
        // if (config.headers) {
            const localStorageData = localStorage.getItem('persist:userToken') || "";
            const token = localStorageData ? (JSON.parse(localStorageData)?.token) || "" : "";
            console.log('token:', token)
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        // }
      return config;
    } catch (error) {
      console.error(`[request error] [${JSON.stringify(error)}]`);
    } finally {
      console.log('config:', config)
      return config;
    }
  };
  
  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };
  
  const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };
  
  const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[response error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };
  
  const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
  };
  
  setupInterceptorsTo(axios);
  
