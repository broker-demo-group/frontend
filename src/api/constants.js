// export const API_URL = "https://broker.tinykittens.dev/backendservice";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_TEST = `${API_URL}/backendservice/system/test`;
export const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;
export const IS_DEV = process.env.NEXT_PUBLIC_IS_DEV === "true";
