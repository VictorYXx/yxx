<template>
    <el-card >
            <el-form :inline='true' >
                <el-form-item label="一级分类1">
                
                      <el-select style="width: 400px;"  v-model="categoryStore.c1Id" @change="handler">
                    <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
                    <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
          
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select style="width: 400px;" >
                        <el-option label="北京"></el-option>
                        <el-option label="上海"></el-option>
                        <el-option label="广州"></el-option>
                        <el-option label="深圳"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类" >
                    <el-select style="width: 400px;" >
                        <el-option label="北京"></el-option>
                        <el-option label="上海"></el-option>
                        <el-option label="广州"></el-option>
                        <el-option label="深圳"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
</template>
<script setup lang='ts'>
import {onMounted,ref}  from 'vue';
import useCategoryStore from '@/store/modules/category';
let categoryStore=useCategoryStore();

// onMounted(async() => {
    
//     let result=await reqC1();
    
    
//     if(result.code==200){
//         c1Arr.value=result.data;
//         console.log(c1Arr.Name)
//     }
//     else{   

//     }

// });
onMounted(()=>{
    getC1();
console.log("111111122222",categoryStore.c1Arr)});
const getC1 = () => {
    //通知分类仓库发请求获取一级分类的数据
    categoryStore.getC1();
    console.log("getC1",categoryStore.c1Arr);
}

let c1Id=ref<number|string>("");
</script>

<style scoped lang='scss'>
</style> 