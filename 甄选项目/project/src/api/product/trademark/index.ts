import request from "@/utils/request";
import type { TradeMarkResponseData } from "./type";
import type { Records } from "./type";
enum API{
    TRADEMARK_URL="/admin/product/baseTrademark/"
}
//获取已有品牌的接口方
export const reqHasTrademark=(page:number,limit:number)=>request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`);