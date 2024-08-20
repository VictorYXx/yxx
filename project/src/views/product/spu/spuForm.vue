<template>
<div>
    <el-form>
        <el-form-item label="Spu名称">
            <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU名牌">
            <el-select v-model="SpuParams.tmId">
                <el-option v-for="(item,index) in AllTradeMark" :key="item.id" :label="item.tmName"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textare" placeholder="请你输入SPU描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload"
                list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handleUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl"alt="Preview Image" style="width: 100%; height: 100%"/>
            </el-dialog>
 
        <el-form-item label="SPU销售属性">
            <!-- 展示销售属性的下拉菜单 -->
            <el-select>
                <el-option label="华为"></el-option>
                <el-option label="oppo"></el-option>
                <el-option label="vivo"></el-option>
            </el-select>
            <el-button style="margin-left:10px" type="primary" size="default" icon="Plus">添加属性值</el-button>
            <!-- table展示销售属性与属性值的地方 -->
            <el-table border style="margin:10px 0px">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" width="120px"></el-table-column>
                <el-table-column label="销售属性值"></el-table-column>
                <el-table-column label="操作" width="120px"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default">保存</el-button>
            <el-button type="primary" size="default" @click="cancel" >取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script setup lang='ts'>

let $emit=defineEmits(['changeScene'])
import { HasSaleAttr, HasSaleAttrResponseData, SaleAttr, SaleAttrResponseData, SpuData, SpuHasImg } from '@/api/product/spu/type'
import {reqAllTradeMark,reqSpuImageList,reqSpuHasSaleAttr,reqAllSaleAttr} from '@/api/product/spu'
import {onMounted} from 'vue'
import { SpuImg,TradeMark } from '@/api/product/trademark/type'
import {ref} from 'vue'

const cancel=()=>{
    $emit('changeScene',0)
}
let AllTradeMark=ref<TradeMark>([])

let imgList=ref<SpuImg>([])

let saleAttr=ref<SaleAttr>([])

let allSaleAttr=ref<HasSaleAttr[]>([]);

let dialogVisible=ref<boolean>(false);

let dialogImageUrl=ref<string>('')

let SpuParams=ref<SpuData>({
    category3Id:"",
    spuName:"",
    description:"",
    tmId:"",
    spuImageList:[],
    spuSaleAttrList:[]
});
const initHasSpuData=async(spu:SpuData)=>{
    SpuParams.value=spu;
    let result=await reqAllTradeMark();
    console.log('spuId',spu);
    
    let result1:SpuHasImg=await reqSpuImageList(spu.id)
    console.log(result1);
    let result2:SaleAttrResponseData=await reqSpuHasSaleAttr((spu.id as number))
    console.log(result2)
    let result3:HasSaleAttrResponseData =await reqAllSaleAttr();
    console.log(result3)

    AllTradeMark.value=result.data;
    imgList.value=result1.data.map(item=>{
        return {
            name:item.imgName,
            url:item.imgUrl
        }
    })
    saleAttr.value=result2.data;
    allSaleAttr.value=result3.data;

}

const handlePictureCardPreview=(file:any)=>{
    dialogImageUrl.value=file.
    dialogVisible.value=true;

}

const handleRemove=()=>{

}
const handleUpload=(file:any)=>{
    if(file.type=='image/png'||file.type=='image/jpeg'||file.type=='image/gif'){
        if(file.size/1024/1024<3)
    {
        return true;
    }else
    {
        ElMessage({
            type:'error',
            message:'上传文件必小于3M'
        })
    }
        return true;
    }else{return false;}
}
defineExpose({initHasSpuData})
// onMounted=()=>{
//     console.log(123)
// }
onMounted
</script>
<style scoped lang='scss'>
</style> 