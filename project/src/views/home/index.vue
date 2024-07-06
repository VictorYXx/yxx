<template>
<div>
    <h1>我是一级路由展示登录成功以后的数据1</h1>
</div>
</template>
<script setup lang='ts'>
import { onMounted } from 'vue';

import useUserStore from '@/store/modules/user';
let userStore=useUserStore();
onMounted(()=>{
    userStore.userinfo()
})
</script>
<style scoped lang='scss'>
</style> 