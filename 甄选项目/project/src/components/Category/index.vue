<template>
<div>
    <el-card>
            <el-form :inline='true'>
                <el-form-item label="一级分类" aria-placeholder="请选择">
                    <el-select >
                        <el-option label="北京"></el-option>
                        <el-option label="上海"></el-option>
                        <el-option label="广州"></el-option>
                        <el-option label="深圳"></el-option>
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
let c1Arr=ref<any>([]);
let c1Id=ref<number>("");
onMounted(async() => {
    let result=await reqC1();
    if(result==200){
        
    }
    else{

    }

});
const getC1 = () => {
    //通知分类仓库发请求获取一级分类的数据
    console.log(123)
}
</script>

<style scoped lang='scss'>
</style> 