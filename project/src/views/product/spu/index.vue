<template>
<div>
    <div>
        <Category  :scene="secens"></Category>
      
        <el-card style="margin: 10px 0px">  
            <div v-show="secens==0">
            <el-button @click="addSpu" icon="Plus" type="primary" size="default">添加SPU</el-button>
            <el-table style="margin: 10px 0px;" border :data="records">
                <el-table-column label="序号" type="index" align="center" prop="id" ></el-table-column>
                <el-table-column label="SPU名称" align="center" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" align="center" prop="description"></el-table-column>
                <el-table-column label="SPU操作" align="center" >
                    <template #="{row,index}">
                        <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
                        <el-button type="primary" size="small" icon="Edit" title="修改SKU" @click="updateSpu(row)"></el-button>
                        <el-button type="primary" size="small" icon="View" title="查看SKU"></el-button>
                        <el-button type="primary" size="small" icon="Delete" title="删除SKU"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3,5,7,9]" :total="total" :background="true"
            layout="total,sizes,prev,pager,next,jumper" @current-change="getHasSpu" @size-change="changeSize">
                
            </el-pagination>

        </div>
        <SpuForm ref="spu" v-show="secens==1" @changeScene="changeScene"></SpuForm>
        <SkuForm v-show="secens==2"></SkuForm>
        </el-card>
   
    </div>
</div>
</template>
<script setup lang='ts'>
import {ref,watch} from 'vue';
 import type {SpuData} from '@/store/modules/category';
import useCategoryStore from '@/store/modules/category';
import {reqHasSpu} from '@/api/product/spu'
// import type {SpuData} from '@/api/product/spu/types'
import { HasSpuResponseData,Records } from '@/api/product/spu/type';
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'


let catggoryStore=useCategoryStore();
let secens=ref<number>(0);
let pageNo=ref<number>(1);
let pageSize=ref<number>(3);
let records=ref<Records>([])
let total=ref<number>(0);
let spu=ref<any>();
watch(()=>catggoryStore.c3Id,()=>{
    getHasSpu()
})
const getHasSpu=async()=>{
    let result:HasSpuResponseData=await reqHasSpu(pageNo.value,pageSize.value,catggoryStore.c3Id)
    if(result.code==200)
    {
        records.value=result.data.records
        total=result.data.total
        console.log('records',records.value)
        
    }
    console.log(result)
}
const changeSize=()=>{
    getHasSpu()
}
const addSpu=()=>{
    secens.value=1;
}
const changeScene=(num:number)=>{
    secens.value=num;

}
const updateSpu=(row:SpuData)=>{
    secens.value=1;
    spu.value.initHasSpuData(row);
}
// const addSpu=()=>{
//     secens.value=1;
// }
</script>
<style scoped lang='scss'>
</style> 