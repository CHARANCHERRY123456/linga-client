import type { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { type LoginReqType , type LoginResType } from "../types/auth/authTypes";
import { user_token } from "../constants/localStorageConstants";
import type { User } from "../types/auth/authSliceTypes";


async function loginService(credentials : LoginReqType) : Promise<LoginResType> {
    const res : AxiosResponse<LoginResType> = await axiosClient.post('/auth/login' , credentials);
    return res.data;
}

async function getUserService() : Promise<User> {
    const token = localStorage.getItem(user_token);
    const res = await axiosClient.get("auth/user/" + token);
    console.log(res.data);
    return res.data;
}

export {loginService, getUserService}