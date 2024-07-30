<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
           <el-menu :collapse="LayOutSettingStore.fold?true:false" :default-active="$route.path" background-color="#001529" text-color="white"
                    active-text-color="yellowgreen">
                    <!--根据路由动态生成菜单-->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            
                <!-- <el-menu background-color="#001529" text-color="white">
                   <el-menu-item index="1" >首页</el-menu-item> 
                   <el-menu-item index="2" >数据大屏</el-menu-item> 
                   <el-sub-menu index="3">
                    <template #title>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="2-1">用户管理</el-menu-item>
                    <el-menu-item index="2-2">角色管理</el-menu-item>
                    <el-menu-item index="2-3">菜单管理</el-menu-item>
                   </el-sub-menu>
                </el-menu> -->
            </el-scrollbar>
            <h1>一级路由组件111</h1>
        </div>
        <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main" :class="{fold:LayOutSettingStore.fold?true:false}">
           <Main></Main>
            <!-- <p style="height: 100px ; width:100px;background-color: red;">我是一个段落</p> -->

        </div>
    </div>
</template>
<script setup lang='ts'>
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Main from './main/index.vue';
import useUserStore from '@/store/modules/user';
import {useRoute} from 'vue-router'
import Tabbar from './tabbar/index.vue'
import useLayOutSettingStore from '@/store/modules/setting';
let userStore=useUserStore();
let $route=useRoute();
let LayOutSettingStore=useLayOutSettingStore();
console.log($route.path)
</script>
<script lang="ts">
export default{
    name:"Layout"
}
</script>
<style scoped lang='scss'>
.layout_container{
    
    width:100%;
    height:100vh;

    .layout_slider{
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background:$base-menu-background;
        transition: all 0.3s;
        
        .scrollbar{
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            .el-menu{
                border-right: none;
            }
        }
        &.fold{
            width: $base-menu-min-width;
        }

    }
    .layout_tabbar {
        position: fixed;
         width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;
        &.fold {
            width: calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }
    }
        .layout_main{
            position:absolute;
            width:calc(100% - $base-menu-width);
            height: calc(100vh - $base-tabbar-height);
            left:$base-menu-width;
            top:$base-tabbar-height;
            padding:20px;
            overflow:auto;
            transition:all 0.3s;
            &.fold{
                width:calc(100vw - $base-menu-min-width);
                left:$base-menu-min-width;
            }
        }
}
</style>
