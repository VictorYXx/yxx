<template>
    <div>
        <Category :scene="secens" />
        <el-card style="margin:10px 0px">
            <div v-show="secens == 0">
                <el-button type="primary" @click="addAttr" size="default" icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true">添加属性</el-button>
                <el-table border style="margin: 10px 0px" :data="attrArr">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row, $index }">
                            <el-tag style="margin: 5px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{
                                item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ row, $index }">
                            <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
                            <el-popconfirm :title="`你确定删除${row.attrName}?`" width="200px" @confirm="deleteAttr(row.id)">
                                <template #reference>
                                    <el-button type="primary" size="small" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>

                          
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="secens == 1">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请您输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>

                <el-button @click="addAttrValue" :disabled="attrParams.attrName ? false : true" type="primary"
                    size="default" icon="Plus">添加属性</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>

                <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
                    <el-table-column width="80px" label="序号" type="index" align="center"></el-table-column>
                    <el-table-column label="属性名称">
                        <template #="{ row, $index }">
                            <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag"
                                @blur="toLook(row,$index)" placeholder="请您输入属性值名称" v-model="row.valueName"
                                size="small"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                        <!-- <template #="{ row, $index }">
                            <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag"
                                @blur="toLook(row, $index)" size="small" placeholder="请你输入属性值名称"
                                v-model="row.valueName"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #="{row,index}">
                            <el-button type="primary" size="small" icon="Delete"
                                @click="attrParams.attrValueList.splice(index,1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save"
                    :disabled="attrParams.attrValueList.length>0?false:true">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>

            </div>
        </el-card>
    </div>
</template>
<script setup lang='ts'>
import { watch, ref, reactive,nextTick,onBeforeUnmount } from "vue";
import { ElMessage } from 'element-plus'

import { reqAttr, reqAddOrUpdateAttr,reqRemoveAttr } from "@/api/product/attr";
import { AttrResponseData, Attr, AttrValue } from "@/api/product/attr/type"
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore();
let attrArr = ref<Attr>([]);
let secens = ref<number>(0);
let flag = ref<boolean>(true);
let attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
})
let inputArr=ref<any>([]);

watch(() => categoryStore.c3Id,() => {
    //清空上一次查询的属性与属性值
    attrArr.value = [];
    //保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return;
    //获取分类的ID
    console.log(9999)
    getAttr();
})
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore;
    console.log(c1Id,c2Id,c3Id)
    console.log(await reqAttr(c1Id, c2Id, c3Id))
    //获取分类下的已有的属性与属性值
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
    if (result.code == 200) {
        attrArr.value = result.data;
    }
}
const addAttr = () => {
    //每一次点击的时候，先清空一下数据再收集数据
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: categoryStore.c3Id,
        categoryLevel: 3,
    })
    secens.value = 1;


}
const updateAttr = () => {

}
const cancel = () => {
    secens.value = 0;
}
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true
    })
    console.log(1233333, attrParams);
}
const save = async () => {
    let result = await reqAddOrUpdateAttr(attrParams);
    if (result.code == 200) {
        secens.value = 0;
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
        getAttr();
    } else {

        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        })
    }

}

const toLook = (row: AttrValue, $index: number) => {
    if (row.valueName.trim() == '') {
        attrParams.attrValueList.splice($index, 1);
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
    }
    if (row.valueName.trim() == '') {
        if (item != row) {
            return item.valueName == row.valueName
        }
    }

    let repeat = attrParams.attrValueList.find((item) => {
        //切记把当前失却焦点属性值对象从当前数组扣除判断
        if (item != row) {
            return item.valueName === row.valueName;
        }
    });
    if (repeat) {
        //将重复的属性值从数组当中干掉
        attrParams.attrValueList.splice($index, 1);
        //提示信息
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return;
    }
    row.flag = false;
}
const toEdit = (row: AttrValue,$index:number) => {
    row.flag = true;
    nextTick(()=>{
        inputArr.value[$index].focus()
    })
    console.log(inputArr.value[$index])
}
const handler=(element)=>{
    console.log(element)
}
const deleteAttr=async (attrId:number)=>{
   let result=  await reqRemoveAttr(attrId)
   if(result.code==200)
   {
    ElMessage({
        type:'success',
        message:'删除成功'
    })
   }else
   {
    ElMessage({
        type:'error',
        message:'删除失败'
    })
   }
} 
onBeforeUnmount(()=>{
    categoryStore.$reset();

}) 
</script>
<style scoped lang='scss'></style>