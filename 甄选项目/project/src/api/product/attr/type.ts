export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}
export interface CategoryObj{
    id:number|string,
    name:string,
    category1Id?:number
}
export interface CategoryResponseData extends ResponseData
{
    data:CategoryObj[]
}
export interface AttrValue{
    id:number,
    valueName:string,
    attrId:number
}