type LoginReqType = {
    email : string,
    password : string
}

type LoginResType = {
    "access_token" : string,
    "token_type" : string
}

export type {LoginReqType , LoginResType}