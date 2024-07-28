import request from "@/utils/request";
enum API{
    HASSPU_URL='/admin/product/'
}
export const reqHasSpu=(page:number,limit:number,category3Id:string|number)=>request.get<any,any>(API.HASSPU_URL+`${page}/${limit}?category3Id=${category3Id}`);