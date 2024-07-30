<template>
<div>
   <router-view v-slot="{Component}">
<transition name="fade">
    <component :is="Component" v-if="true"></component>
</transition></router-view>
</div>
</template>
<script lang="ts">
export default{
    name:"Main"
}
</script>
<script setup lang='ts'>
import {watch,ref,nextTick} from 'vue';
import useLayOutSettingStore from '@/store/modules/setting';
let layOutSettingStore=useLayOutSettingStore();
let flag=ref(true);
watch(()=>layOutSettingStore.refsh,()=>{
    flag.value=false;
    nextTick(()=>{
        flag.value=true;
    })
})
</script>
<style scoped lang='scss'>
.fade-enter-from{
    opacity: 0;
    transform: scale(0);
}
.fade-enter-active{
    transition: all 1s;
}
.fade-enter-to{
    opacity: 1;
    transform: scale(1);
}
</style> 