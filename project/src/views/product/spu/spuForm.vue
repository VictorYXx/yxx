<template>
<div>
    <el-form>
        <el-form-item label="Spu名称">
            <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU名牌">
            <el-select v-model="SpuParams.tmId">
                <el-option v-for="(item,index) in AllTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
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
            <el-select v-model="saleAttrIdAndValueName" :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'">
                <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key="item.id"
                    :label="item.name"></el-option>
            </el-select>
            <el-button @click="addSaleAttr"  style="margin-left:10px" type="primary" size="default" icon="Plus">添加属性值</el-button>
            <!-- table展示销售属性与属性值的地方 -->
            <el-table border style="margin:10px 0px" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <template #="{row,$index}">
                        <el-tag style="margin: 0px 5px" @close="row.spuSaleAttrValueList.splice(index,1)" v-for="(item,index) in row.spuSaleAttrList" :key="row.id">{{item.saleattrValueName}}</el-tag>
                        <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag==true" placeholder="请你输入属性值" size="small" style="width: 100px;"></el-input>
                        <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <el-button type="primary" size="small" icon="Delete" @click="saleAttr.splice($index,1)"></el-button>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button type="primary" size="default" @click="cancel" >取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script setup lang='ts'>

let $emit=defineEmits(['changeScene'])
import { AllTradeMark, HasSaleAttr, HasSaleAttrResponseData, SaleAttr, SaleAttrResponseData, SaleAttrValue, SpuData, SpuHasImg } from '@/api/product/spu/type'
import {reqAllTradeMark,reqSpuImageList,reqSpuHasSaleAttr,reqAllSaleAttr,reqAddOrUpdateSpu } from '@/api/product/spu'
import {onMounted} from 'vue'
import { SpuImg,TradeMark } from '@/api/product/trademark/type'
import {ref,computed} from 'vue'
import { ElMessage } from 'element-plus';

const cancel=()=>{
    $emit('changeScene',{flag:0,param:'update'})
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
let saleAttrIdAndValueName = ref<string>('')
const initHasSpuData=async(spu:SpuData)=>{
    SpuParams.value=spu;
    let result=await reqAllTradeMark();
    console.log('spuId',spu);
    
    let result1:SpuHasImg=await reqSpuImageList(spu.id)
    console.log(result1);
    let result2:SaleAttrResponseData=await reqSpuHasSaleAttr('6')
    console.log('result2',result2)
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
//计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
    //全部销售属性:颜色、版本、尺码
    //已有的销售属性:颜色、版本
    let unSelectArr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName;
        });
    })
    return unSelectArr;
})
const addSaleAttr=()=>{
    const [baseSaleAttrId,saleAttrName]=saleAttrIdAndValueName.value.split(':');
    let newSaleAttr:SaleAttr={
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList:[]
    }
    saleAttr.value.push(newSaleAttr);
    saleAttrIdAndValueName.value='';
}
const toEdit=(row:SaleAttr)=>{
    row.flag=true;
    row.saleAttrValue=''
}
const toLook=(row:SaleAttr)=>{
    const {baseSaleAttrId,saleAttrValue}=row;
    let newSaleAttrValue:SaleAttrValue={
        baseSaleAttrId,
        saleattrValueName:(saleAttrValue as string)
    }
    if((saleAttrValue as string).trim()==''){
        ElMessage({
            type:'error',
            message:'属性不能为空'
        })
        return;}
    let repeat=row.spuSaleAttrValueList.find(item=>{
        return item.saleAttrValueName==saleAttrValue;
    })
    if(repeat){
        ElMessage({
            type:'error',
            message:'属性值重复'
        })
        return}
   row.spuSaleAttrValueList.push(newSaleAttrValue);
    row.flag=false;
}
const save=async()=>{
    SpuParams.value.spuImageList=imgList.value.map((item:any)=>{
        return{
            imgName:item.name,
            imgUrl:(item.response&&item.response.data)

        }
    })
    SpuParams.value.spuSaleAttrList=saleAttr.value;
    let result=await reqAddOrUpdateSpu(SpuParams.value);
    if(result.code==200)
    {
        ElMessage({
            type:'success',
            message:SpuParams.value.id?'更新成功':'添加成功'
        })
        $emit('changeScene',{flag:0,params:SpuParams.value.id?'update':'add'});
    }else
    {
        ElMessage({
            type: 'error',
            message: SpuParams.value.id ? '更新失败' : '添加失败'
        })
    }
    console.log(SpuParams.value.spuImageList)
}
const initAddSpu=async(c3Id:number|string)=>{
 //清空数据
 Object.assign(SpuParams.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    });
    //清空照片
    imgList.value = [];
    //清空销售属性
    saleAttr.value = [];
    saleAttrIdAndValueName.value  = '';
    SpuParams.value.category3Id=c3Id;
    let result:AllTradeMark=await reqAllTradeMark();
    let result1:HasSaleAttrResponseData=await reqAllSaleAttr();
    AllTradeMark.value=result.data;
    allSaleAttr.value=result1.data;
}
defineExpose({initHasSpuData,initAddSpu})

// onMounted=()=>{
//     console.log(123)
// }
onMounted
</script>
<style scoped lang='scss'>
</style> 