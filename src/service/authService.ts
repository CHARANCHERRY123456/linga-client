import type { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { type LoginReqType , type LoginResType } from "../types/authTypes";


async function loginService(credentials : LoginReqType) : Promise<LoginResType> {
    const res : AxiosResponse<LoginResType> = await axiosClient.post('/api/login' , credentials);
    return res.data;
}

export {loginService}