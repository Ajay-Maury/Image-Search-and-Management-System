// const CONFIG = {
//   IMAGE_SEARCH_SERVICE_URL: process.env.IMAGE_SEARCH_SERVICE_URL,
// };

// export const config = CONFIG;

const CONFIG = {
  IMAGE_SEARCH_SERVICE_URL: import.meta.env.VITE_IMAGE_SEARCH_SERVICE_URL,
};

export const config = CONFIG;
