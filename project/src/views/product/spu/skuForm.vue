<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
            </el-form-item>
            <el-form-item label="重量(g)">
                <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true" style="width: 100%;">
                    <el-form-item :label="item.attrName" v-for="(item, index) in attrArr" :key="item.id">
                        <el-select v-model="item.attrIdAndValue" style="width: 100px;">
                            <el-option :value="`${item.id}:${attrValue.id}`"
                                v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id"
                                :label="attrValue.valueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form>
                    <el-form-item :label="item.saleAttrName" v-for="(item, index) in saleArr" :key="item.id">
                        <el-select v-model="item.saleIdAndValueId">
                            <el-option :value="`${item.id}:${saleAttrValue.id}`"
                                v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                                :label="saleAttrValue.saleAttrValueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table border :data="imgArr" ref="table">
                    <el-table-column type="selection" width="80px" align="center"></el-table-column>
                    <el-table-column label="名称"></el-table-column>
                    <el-table-column label="图片">
                        <template #="{ row, $index }">
                            <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row, $index }">
                            <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="save">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang='ts'>
import { reqAttr } from '@/api/product/attr';
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu'
import type { SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue';

let attrArr = ref<any>([]);
let saleArr = ref<any>([]);
let imgArr = ref<any>([]);
let table = ref<any>();
let skuParams = reactive<SkuData>({
    "category3Id": "",
    "spuId": "",
    "tmId": "",
    "skuName": "",
    "price": "",
    "weight": "",
    "skuDesc": "",
    "skuAttrValueList": [
    ],
    "skuSaleAttrValueList": [
    ],
    "skuDefaultImg": ""
})
let $emit = defineEmits(['changeScene'])
const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' })
}

const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    skuParams.category3Id = spu.category3Id;
    skuParams.spuId = spu.id;
    skuParams.tmId = spu.tmId;
    console.log('Id为：', c1Id, c2Id, spu.category3Id)
    let result = await reqAttr(c1Id, c2Id, spu.category3Id);
    console.log('result', result);
    let result1: any = await reqSpuHasSaleAttr(spu.id);
    console.log('spuId', spu.id)
    console.log('result1', result1)
    let result2: any = await reqSpuImageList(spu.id);

    console.log('result2', result2)
    attrArr.value = result.data;
    saleArr.value = result1.data;
    imgArr.value = result2.data;


}
const handler = (row: any) => {
    console.log('imgArr', imgArr)
    imgArr.value.foreach((item: any) => {
        table.value.toggleRowSelection(item, false);
    })
    table.value.toggleRowSelection(row, true);
    skuParams.skuDefaultImg = row.imgUrl;
}
const save = async () => {
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        console.log('next', next)
        if (next.attrIdAndValue) {
            let [attrId, valueId] = next.attrIdAndValue.split(':')
            prev.push({
                attrId,
                valueId,
            })
        }
        return prev
    }, [])
    console.log('saleArr', saleArr)
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            console.log('next', next);
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
            console.log('saleIdAndValueId', next.saleIdAndValueId)
            prev.push({
                saleAttrId, saleAttrValueId
            })
        }
        return prev
    },[]);

    console.log('skuParams', skuParams)
    let result: any = await reqAddSku(skuParams);
    if(result.code==201)
    {
        ElMessage({
            type:'success',
            message:'添加SKU成功'
        });
        $emit('changeScene',{flag:0,params:''})
    }else{
        ElMessage({
            type:'error',
            message:'添加失败'
        })
    }
}

defineExpose({
    initSkuData
})

</script>
<style scoped lang='scss'></style>