<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
            <el-table style="margin: 10px 0px" border :data="trademark">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <el-table-column label="品牌名称" prop="tmName">
                    <template #="{ row, $index }">
                        <pre>{{ row.tmName }}</pre>
                    </template>
                </el-table-column>
                <el-table-column label="品牌logo">
                    <template #="{ row, $index }">
                        <img :src="row.logoUrl" alt="未有图片" style="width: 100px">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-popconfirm :title="`您确定要删除${row.tmName}`">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete" @confirm='removeTradeMark(row.id)'></el-button>
                            </template>
                        </el-popconfirm>
                        
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="sizeChange" @current-change="getHasTrademark" v-model:current-page="pageNo" v-model:page-size="limit" :page-size="[3, 5, 7, 9]"
                layout="prev,pager,next,jumper,->sizes,total" :total="400"></el-pagination>

        </el-card>
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id?'修改品牌':'添加品牌'">
            <el-form style="width: 80%; " :model="trademarkParams" :rules="rules" ref="formRef">

                <el-form-item label="品牌名称" label-width="80px" prop="tmName" >
                    <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName" />
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
                    
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
                        :show-file-list="true"  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar">
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus/>
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang='ts'>
import { ref, onMounted,reactive,nextTick } from 'vue';
import { reqHasTrademark,reqAddOrUpdateTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData,TradeMark } from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus';
import { reqDeleteTrademark } from '@/api/product/trademark/index';
let pageNo = ref<number>(1);
let limit = ref<numver>(3);
let total = ref<number>(0);
let trademark = ref<any>([]);
let dialogFormVisible = ref<boolean>(false)
//定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
    tmName:'',
    logoUrl:''
});
let formRef=ref();
const getHasTrademark = async () => {
    let result = await reqHasTrademark(pageNo.value, limit.value);
    if (result.code == 200) {
        total.value = result.data.total
        trademark.value = result.data.records;
    }
}
onMounted(() => {
    getHasTrademark();
})

const beforeAvatarUpload:UploadProps['beforeUpload']=(rawFile)=>{
    if(rawFile.type=="image/png"||rawFile.type=="image/jpeg"||rawFile.type=='image/gif')
    {
        if(rawFile.size/1024/1024<4)
        {
            return true;
        }else
        {
            ElMessage({
                type:'error',
                message:'上传文件大小小于4M'
            })
        }
    }else
    {
        ElMessage({
            type:'error',
            message:"上传文件格式必PNG|JPG|GIF"
        })
    }
}
const updateTrademark=(row:TradeMark)=>{
    dialogFormVisible.value=true;
    Object.assign(trademarkParams,row);
    // trademarkParams.id=row.id;
    // trademarkParams.tmName=row.tmName;
    // trademarkParams.logoUrl=row.logoUrl;
}
const  handleAvatarSuccess:UploadProps['onSuccess']=(response,uploadFile)=>{
   trademarkParams.logoUrl=response.data;
   formRef.value.clearValidate('logoUrl')
}
//添加品牌按钮的回调
const addTrademark = () => {
    //对话框显示
    dialogFormVisible.value = true;
    //清空数据
    trademarkParams.id=0;
    trademarkParams.logoUrl='';
    trademarkParams.tmName='';
    // formRef.value?.clearValidate('tmName');
    // formRef.value?.clearValidate('logoUrl');
    nextTick(()=>{
        formRef.value?.clearValidate('tmName');
        formRef.value?.clearValidate('logoUrl');
    })
}
const confirm=async()=>{
    //点击确定的时候触发图片校验的效果
    await formRef.value.validate();
  
   let result:any=  await reqAddOrUpdateTrademark(trademarkParams);
    if(result.code==200)
    {
        dialogFormVisible.value=false;
        ElMessage({
            type:'success',
           message:trademarkParams.id?'修改品牌成功':'添加品牌成功'
        })
        getHasTrademark(trademarkParams.id?pageNo.value:1);
        trademarkParams.id=0;
        trademarkParams.tmName='';
        trademarkParams.logoUrl='';
    }else
    {
        ElMessage:({
            type:'error',
            message:trademarkParams.id?'修改品牌失败':'添加品牌失败'
        })
        dialogFormVisible.value=false;
    }
}
const cancel=()=>{
    dialogFormVisible.value=false;
    trademarkParams.tmName='';
    trademarkParams.logoUrl='';
}
const sizeChange = () => {
    //当前每一页的数据量发生变化的时候，当前页码归1
    getHasTrademark();
}
const validatorTmName=(rules:any,value:any,callback:any)=>{
    if(value.trim().length>=2)
    {
        callback();
    }else
    {
        callback(new Error("品牌名称位数大于两位"))
    }

}
const validatorLogoUrl=(rules:any,value:any,callback:any)=>{
    if(value)
    {
        callback();
    }else
    {
        callback(new Error('Logo图片务必上传'));
    }
}
//表单规则对象
const rules={
    tmName:[
        {
            required:true,trigger:'blur',validator:validatorTmName
        }
    ],
    logoUrl:[
        {
            required:true,validator:validatorLogoUrl
        }
    ]
}
const removeTradeMark=async(id:number)=>{
    let result=await reqDeleteTrademark(id);
    if(result.code==200)
    {
        ElMessage({
            type:'success',
            message:'删除品牌成功 '
        })
        getHasTrademark(trademark.value.length>1?pageNo.value:pageNo.value-1)
    }
    else
    {
        ElMessage({
            type:'error',
            message:'删除品牌失败 '
        })
    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
