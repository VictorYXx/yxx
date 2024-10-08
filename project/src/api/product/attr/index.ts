import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData } from './type'
enum Api {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL='/admin/product/deleteAttr/'
}
export const reqC1 = () => request.get<any, CategoryResponseData>(Api.C1_URL)
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(Api.C2_URL + category1Id)
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(Api.C3_URL + category2Id)
export const reqAttr = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
) =>
  request.get<any, AttrResponseData>(
    Api.ATTR_URL  + `${category1Id}/${category2Id}/${category3Id}`,
  )

export const reqAddOrUpdateAttr=(data:Attr)=>request.post<any,any>(Api.ADDORUPDATEATTR_URL,data);
// export const reqAttr = (category1Id: string | number, category2Id: string | number, category3Id: string | number) => request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`);
export const reqRemoveAttr=(attrId:number)=>request.delete<any,any>(Api.DELETEATTR_URL+attrId);
