<template>
<div>
    <el-button type="primary" size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
        <el-button type="primary" size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-button type="primary" size="small" icon="Setting" circle></el-button>
        <img :src="userStore.avatar" style="width:24px;height: 24px;margin: 0px 10px;border-radius: 50%"/>
        <el-dropdown>
            <span class="el-dropdown-link">
                {{userStore.username}}
                <el-icon class="el-icon-right">
                    <arrow-down/>
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>

            </template>
        </el-dropdown>
</div>
</template>
<script setup lang='ts'>
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting';
import { useRouter,useRoute } from 'vue-router';
let layOutSettingStore=useLayOutSettingStore();
let userStore=useUserStore();
let $router=useRouter();
let $route=useRoute();
//刷新按钮
const updateRefsh=()=>{
    LayOutSettingStore.refsh=!LayOutSettingStore.refsh
}

const fullScreen=()=>{
    let full=document.fullscreenElement;
    if(!full)
    {
        document.documentElement.requestFullscreen();
    }else
    {
        document.exitFullscreen();
    }
}
const logout=()=>{
    userStore.userLogout();
    $router.push({path:'/login',query:{redirect:route.path}});
}
</script>
<script lang="ts">
export default{
    name:"Setting"
}
</script>
<style scoped lang='scss'>
</style> 