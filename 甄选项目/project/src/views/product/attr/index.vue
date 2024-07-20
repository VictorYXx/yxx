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
                            <el-tag style="margin: 5px;" v-for="(item, index) in row.attrValueList"
                                :key="item.id">{{ item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ row, $index }">
                            <el-button type="primary" size="small" icon="Edit" @click="updateAttr"></el-button>
                            <el-button type="primary" size="small" icon="Delete"></el-button>
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

                <el-button @click="addAttrValue" type="primary"  size="default" icon="Plus" :disabled='attrParams.attrName?false:true'>添加属性</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>

                <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
                    <el-table-column width="80px" label="序号" type="index" align="center"></el-table-column>
                    <el-table-column label="属性名称">
                        <template #="{row,$index}">
                            <el-input placeholder="请您输入属性值名称" v-model="row.valueName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作"></el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>

            </div>
        </el-card>
    </div>
</template>
<script setup lang='ts'>
import { watch, ref, reactive } from "vue";
import { reqAttr} from "@/api/product/attr";
import { AttrResponseData, Attr } from "@/api/product/attr/type"
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore();
let attrArr = ref<Attr>([]);
let secens = ref<number>(0);
let attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [
        
    ],
    categoryId: '',
    categoryLevel: 3,
})
watch(() =>
    categoryStore.c3Id, async () => {
        attrArr.value = [];
        if (!categoryStore.c3Id) return;
        const { c1Id, c2Id, c3Id } = categoryStore;
        getAttr();
    }
)
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore;
    console.log('categoryStore', categoryStore)
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
    if (result.code == 200) {
        attrArr.value = result.data
    }
}
const addAttr = () => {
    secens.value = 1;
    attrParams.categoryId=categoryStore.c3Id
}
const updateAttr = () => {

}
const cancel = () => {
    secens.value = 0;
}
const addAttrValue=()=>{
    console.log('pppppp ')
    attrParams.attrValueList.push({
        
    })
}
const save=()=>{

}
</script>
<style scoped lang='scss'></style>