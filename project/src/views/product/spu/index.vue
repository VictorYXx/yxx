<template>
    <div>
        <div>
            <Category :scene="secens"></Category>

            <el-card style="margin: 10px 0px">
                <div v-show="secens == 0">
                    <el-button @click="addSpu" icon="Plus" type="primary" size="default">添加SPU</el-button>
                    <el-table style="margin: 10px 0px;" border :data="records">
                        <el-table-column label="序号" type="index" align="center" prop="id"></el-table-column>
                        <el-table-column label="SPU名称" align="center" prop="spuName"></el-table-column>
                        <el-table-column label="SPU描述" align="center" prop="description"></el-table-column>
                        <el-table-column label="SPU操作" align="center">
                            <template #="{ row, index }">
                                <el-button type="primary" size="small" icon="Plus" title="添加SKU"
                                    @click="addSku(row)"></el-button>
                                <el-button type="primary" size="small" icon="Edit" title="修改SKU"
                                    @click="updateSpu(row)"></el-button>
                                <el-button type="primary" size="small" icon="View" title="查看SKU"
                                    @click="findSku(row)"></el-button>
                                <el-popconfirm :title="`你确定删除 ${row.spuName}`" width="200pxp" @confirm="deleteSpu(row)">
                                    <template #reference>
                                        <el-button type="primary" size="small" icon="Delete" title="删除SKU"></el-button>
                                    </template>
                                </el-popconfirm>

                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                        :total="total" :background="true" layout="total,sizes,prev,pager,next,jumper"
                        @current-change="getHasSpu" @size-change="changeSize">

                    </el-pagination>

                </div>
                <SpuForm ref="spu" v-show="secens == 1" @changeScene="changeScene"></SpuForm>
                <SkuForm ref="sku" v-show="secens == 2" @changeScene="changeScene"></SkuForm>
                <el-dialog v-model="show" title="SKU列表">
                    <el-table border :data="skuArr">
                        <el-table-column label="SKU名字" prop="skuName"></el-table-column>
                        <el-table-column label="SKU价格" prop="price"></el-table-column>
                        <el-table-column label="SKU重量" prop="weight"></el-table-column>
                        <el-table-column label="SKU图片">
                            <template #="{ row, $index }">
                                <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
                            </template>
                        </el-table-column>
                    </el-table>
                </el-dialog>
            </el-card>

        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, watch,onBeforeUnmount} from 'vue';
import type { SpuData } from '@/store/modules/category';
import useCategoryStore from '@/store/modules/category';
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
// import type {SpuData} from '@/api/product/spu/types'
import { HasSpuResponseData, Records, SkuData, SkuInfoData } from '@/api/product/spu/type';
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { tr } from 'element-plus/es/locales.mjs';
import { ElMessage } from 'element-plus';


let categoryStore = useCategoryStore();
let secens = ref<number>(0);
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let records = ref<Records>([])
let total = ref<number>(0);
let spu = ref<any>();
let sku = ref<any>();
let skuArr = ref<SkuData[]>([]);
let show = ref<boolean>(false);
watch(() => categoryStore.c3Id, () => {
    getHasSpu()
})
const getHasSpu = async () => {
    let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (result.code == 200) {
        records.value = result.data.records
        total = result.data.total
        console.log('records', records.value)

    }
    console.log(result)
}
const changeSize = () => {
    getHasSpu()
}
const addSpu = () => {
    secens.value = 1;
    console.log('spu', spu.value);
    spu.value.initAddSpu(categoryStore.c3Id);
}
const changeScene = (obj: any) => {

    secens.value = obj.flag;
    if (obj.params == 'update') {
        getHasSpu(pageNo.value)
    } else {
        getHasSpu();
    }


}
const updateSpu = (row: SpuData) => {
    secens.value = 1;
    spu.value.initHasSpuData(row);
}
// const addSpu=()=>{
//     secens.value=1;
// }
const addSku = (row: any) => {
    secens.value = 2;
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);
}
const findSku = async (row: SpuData) => {
    let result: SkuInfoData = await reqSkuList((row.id as number));
    console.log(result);
    if (result.code == 200) {
        skuArr.value = result.data;
        show.value = true;
    }
}
const deleteSpu = async (row: SpuData) => {
    console.log('row.id', row.id);
    let result = await reqRemoveSpu(row.id as number);
    console.log('result', result);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
onBeforeUnmount(()=>{
    categoryStore.$reset();
})
</script>
<style scoped lang='scss'></style>