<template>
<div>
    <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <el-icon style="margin: 0px 5px;">
                <component :is="item.meta.icon"></component>
         
            </el-icon>
            <span style="margin: 0px 5px;"> {{item.meta.title}}</span>
        </el-breadcrumb-item>
     
    </el-breadcrumb>
</div>
</template>
<script setup lang='ts'>
 import { useRoute } from 'vue-router';
import {ref} from 'vue'
import useLayOutSettingStore from '@/store/modules/setting';
let LayOutSettingStore=useLayOutSettingStore();
 let $route=useRoute()
let fold=ref(false)
const changeIcon=()=>{
    LayOutSettingStore.fold=!LayOutSettingStore.fold;
}
const handler=()=>{
    console.log($route.matched);
}
</script>
<script lang="ts">
export default{
    name:"Breadcrumb"
}
</script>
<style scoped lang='scss'>
</style> 