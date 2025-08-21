import axios, { type AxiosInstance } from "axios";
import { BASE_URL } from "../config/envConfig";
import { user_token } from "../constants/localStorageConstants";

const axiosClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
})

axiosClient.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem(user_token);
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req
    },
    (error) => {
        Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
)

export default axiosClient;