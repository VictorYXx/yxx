<template>
    <div>
       <Category/>
        <el-card style="margin:10px 0px" >
            <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id?false:true">添加属性</el-button>
            <el-table border style="margin: 10px 0px ;">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px"></el-table-column>
                <el-table-column label="属性值名称" ></el-table-column>
                <el-table-column label="操作" width="120px"></el-table-column>
            </el-table>
        </el-card>
    </div>
    </template>
    <script setup lang='ts'>
    import { watch } from "vue";
    import { reqAttr } from "@/api/product/attr";
    import useCategoryStore from "@/store/modules/category";
    let categoryStore=useCategoryStore();
    watch(()=> 
        categoryStore.c3Id,async()=>{
            const{c1Id,c2Id,c3Id}=categoryStore;
            getAttr();
            }
    )
    const getAttr=async()=>{
        const{c1Id,c2Id,c3Id}=categoryStore;
       let result= await reqAttr(c1Id,c2Id,c3Id);
       console.log('asdc',result);
    }
    </script>
    <style scoped lang='scss'>
    </style> 