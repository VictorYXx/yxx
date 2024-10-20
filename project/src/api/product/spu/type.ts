import { TradeMark } from '../trademark/type'

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface SpuData {
  category3Id: string | number
  id?: number
  spuName: string
  description: string
  spuImageList: null | SpuImg[]
  tmId: number
  spuSaleAttrList: null | SaleAttr[]
}
export type Records = SpuData[]
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}

export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}
export interface SpuImg {
  id: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: string
  name?: string
  url?: string
}
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
export type SpuSaleAttrValueList = SaleAttrValue[]
export interface SaleAttr {
  "id"?: number,
  "createTime"?: null,
  "updateTime"?: null,
  "spuId"?: number,
  "baseSaleAttrId": number | string,
  "saleAttrName": string,
  "spuSaleAttrValueList": SpuSaleAttrValueList
  flag?: boolean,
  saleAttrValue?: string,
}
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}
export interface HasSaleAttr {
  id: number
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
export interface Attr{
  attrId:number|string,
  valueId:number|string
}
export interface  saleAttr{
  saleAttrId:number|string,
  saleAttrValueId:number|string
}
export interface SkuData{
  category3Id:string|number,
  spuId:string|number,
  tmId:string|number,
  skuName:string|number,
  price:string|number,
  weight:string|number,
  skuDesc:string,
  skuAttrValueList?:Attr[],
  skuSaleAttrValueList?:saleAttr[],
  skuDefaultImg:string
}
export interface SkuInfoData extends ResponseData{
  data:SkuData[]
}