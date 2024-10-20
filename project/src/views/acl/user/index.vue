<template>
<div>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名：">
                <el-input placeholder="请你输入搜索的用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" >搜索</el-button>
                <el-button type="primary" size="default" >重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
 
    <el-card style="margin: 10px 0px">
        <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
        <el-button type="primary" size="default">批量删除</el-button>
        <el-table style="margin: 10px 0px;" border :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column  align="center" label="#" type="index"></el-table-column>
            <el-table-column  align="center" label="id"  prop="id"></el-table-column>
            <el-table-column  align="center" label="用户名字"  prop="loginName" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="用户名称" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="用户角色" prop="nickName" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="操作" width="300px">
                <template #="{row,$index}">
                    <el-button type="primary" size="small" icon="User" @click="setRole">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
                    <el-button type="primary" size="small" icon="Edit">删除 </el-button>
                </template>
            </el-table-column>
        </el-table><div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handler"
      @current-change="getHasUser"
      :current-page="pageNo"
      v-model:pageSize="pageSize"
      :page-sizes="[5,7,9,11]"
      layout="total, sizes, prev, pager, next, jumper, ->,size,total"
      :total="total">
    </el-pagination>
  </div>
    </el-card>
    <el-drawer v-model="drawer" :direction="direction">
        <template #header>
                <h4>{{userParams.id?'更新用户':'添加用户'}}</h4>
        </template>

        <template #default :model="userParams">
            <el-form :rules="rules">
                 <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
                 </el-form-item>
                 <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请您输入用户昵称" v-model="userParams.name"></el-input>
                 </el-form-item>
                 <el-form-item label="用户密码" prop="password">
                    <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
                 </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </div>
        </template>
    </el-drawer>
    <el-drawer v-model="drawer1" :direction="direction">
        <template #header>
            <h4>分配角色(职位)</h4>
        </template>
        <template #default>
            <div>
                <el-form>
                    <el-form-item label="用户姓名">
                        <el-input v-model="userParams.username" :disable="true"></el-input>
                    </el-form-item>
                    <el-form-item lable="职位列表">
                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handlerCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="userRole">
                            <el-checkbox v-for="(role,index) in allRole" :key="index" :label="role">{{role}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        <template #footer>
            <div style="flex: auto;">
                <el-button @click="cancelClick">cancel</el-button>
                <el-button type="primary" @click="confirmClick">confirm</el-button>
            </div>
        </template>
    </el-drawer>
</div>
</template>

<script setup lang='ts'>
import { onMounted,ref,reactive,nextTick } from 'vue';
import { reqUserInfo,reqAddOrUpdateUser} from '@/api/acl/user';
import useUserStore from '@/store/modules/user';
import type { UserResponseData,Records,User } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus';
import { el } from 'element-plus/es/locales.mjs';
let pageNo=ref<number>(1);
let pageSize=ref<number>(5);
let total=ref<number>(0);
let userArr=ref<Records>([]);
let drawer=ref<boolean>(false);
let drawer1=ref<boolean>(false);
let userStore=useUserStore();
const getHasUser=async(pager=1)=>{
    console.log(111)
    pageNo.value=pager;
    let result:UserResponseData= await reqUserInfo(pageNo.value,pageSize.value);
    console.log('result',result);
    if(result.code==200){
        total.value=result.data.total;  
        userArr.value=result.data.records;
    }
}
onMounted(()=>{
    getHasUser();
    userStore.userinfo()
 
})
const handler=()=>{
    getHasUser();
}
const addUser=()=>{
    drawer.value=true;
    Object.assign(userParams,{
        username:'',
        name:'',
        password:'',
    });
    nextTick(()=>{
        formRef.value.clearValidate();
    })
}
const updateUser=(row:User)=>{
    drawer.value=true;
    Object.assign(userParams,row);
    nextTick(()=>{
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('name');
        formRef.value.clearValidate('password');
    })
}
let userParams=reactive<User>({
     username:'',
     name:'',
     password:'',

})
let formRef=ref<any>();
const save=async()=>{
    formRef.value.validator();
   let result:any= await reqAddOrUpdateUser(userParams);
   if(result.code==200)
   {
    drawer.value=false;
    ElMessage({type:'success',message:userParams.id?'更新成功':'添加成功'})
    getHasUser(userParams.id?pageNo.value:1);
    window.location.reload();
   }else
   {
        drawer.value=false; 
        ElMessage({type:'success',message:userParams.id?'更新失败':'添加失败'})    
   }
}
const cancel=()=>{
    drawer.value=false;
}
const validatorUsername=(rule:any,value:any,callback:any)=>{
     if(value.trim().length>=5)
     {
        callback();
     }else
     {
        callback(new Error('用户得名字至少五位'));
     }
}
const validatorname=(rule:any,value:any,callback:any)=>{
     if(value.trim().length>=5)
     {
        callback();
     }else
     {
        callback(new Error('用户呢称字至少五位'));
     }
}
const validatorPassword=(rule:any,value:any,callback:any)=>{
     if(value.trim().length>=5)
     {
        callback();
     }else
     {
        callback(new Error('用户呢称字至少五位'));
     }
}

const rules={
    username:[{
        required:true,
        trigger:'blur',
        validator:validatorUsername
    }],
    name:[{
        required:true,
        trigger:'blur',
        validator:validatorname
    }],
    password:[{
        required:true,
        trigger:'blur',
        validator:validatorPassword
    }]
}
const setRole=(row:User)=>{
    drawer1.value=true;
    console.log(row);
    Object.assign(userParams,row);
}
let checkAll=ref<boolean>(false);
let allRole=ref(['销售','前台','财务','boss']);
let userRole=['销售','前台'];
const isIndeterminate=ref<boolean>(true);
const handlerCheckAllChange=(val:boolean)=>{
   userRole.value= val?allRole.value:[];
   isIndeterminate.value=false;
}
const handleCheckedCitiesChange=()=>{
    isIndeterminate.value=allRole.value.length===userRole.value.length;
}
</script>
<style scoped lang='scss'>
.form{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style> 