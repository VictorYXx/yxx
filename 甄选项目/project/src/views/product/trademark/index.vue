<template>
<el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <el-table style="margin: 10px 0px" border :data="trademark">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName">
            <template #="{row,$index}">
                <pre>{{row.tmName}}</pre>
            </template>
        </el-table-column>
        <el-table-column label="品牌logo">
            <template #="{row,$index}">
                <img :src="row.logoUrl" alt="未有图片" style="width: 100px">
            </template>
        </el-table-column>
        <el-table-column label="品牌操作">
            <template #="{row,$index}">
                <el-button type="primary" size="small" icon="Edit"></el-button>
                <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-size="[3,5,7,9]"
    layout="prev,pager,next,jumper,->sizes,total" :total="400"></el-pagination>

</el-card>
</template>
<script setup lang='ts'>
import {ref,onMounted} from 'vue';
import {reqHasTrademark} from '@/api/product/trademark';
import type {Records,TradeMarkResponseData} from '@/api/product/trademark/type'
let pageNo=ref<number>(1);
let limit=ref<numver>(3);
let total=ref<number>(0);
let trademark=ref<any>([]);
const getHasTrademark= async ()=>{
 let result=  await reqHasTrademark(pageNo.value,limit.value);
    if(result.code==200)
    {
        total.value=result.data.total
        trademark.value=result.data.records;
    }
}
onMounted(()=>{
    getHasTrademark();
})
</script>
<style scoped lang='scss'>
</style> 