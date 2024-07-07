<template>
<div>
    <el-card>
            <el-form :inline='true'>
                <el-form-item label="一级分类" aria-placeholder="请选择">
                    <el-select v-model="c1Id">
                        <!-- <el-option v-for="(c1,index) in c1Arr " :key="c1.c1Id" :label="c1.name" :value="c1.id" ></el-option> -->
                        <el-optioon v-for="(c1,index) in categoryStore.c1Arr" :key="c1.c1Id" :label="c1.name" :value="c1.id"></el-optioon>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select >
                        <el-option label="北京"></el-option>
                        <el-option label="上海"></el-option>
                        <el-option label="广州"></el-option>
                        <el-option label="深圳"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select >
                        <el-option label="北京"></el-option>
                        <el-option label="上海"></el-option>
                        <el-option label="广州"></el-option>
                        <el-option label="深圳"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
</div>
</template>
<script setup lang='ts'>
import {reqC1} from '@/api/product/attr';
import {onMounted,ref}  from 'vue';
import useCategoryStore from '@/store/modules/category';
let categoryStore=useCategoryStore();
onMounted(()=>{categoryStore.getC1();
console.log("111111122222",categoryStore.c1Arr)});
let c1Arr=ref<any>([]);
let c1Id=ref<number|string>("");
onMounted(async() => {
    
    let result=await reqC1();
    
    
    if(result.code==200){
        c1Arr.value=result.data;
        console.log(c1Arr.Name)
    }
    else{   

    }

});
const getC1 = () => {
    //通知分类仓库发请求获取一级分类的数据
    console.log(12333333)
}
</script>

<style scoped lang='scss'>
</style> 