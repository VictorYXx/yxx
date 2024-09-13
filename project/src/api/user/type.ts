export interface loginFormData{
    username:string,
    password:string
}
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}
interface dataType{
    token?:string,
    message?:string
}
export interface loginResponseData extends ResponseData
{
    data:string
}
export interface userInfoResponseData extends ResponseData
{
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string
    }
}