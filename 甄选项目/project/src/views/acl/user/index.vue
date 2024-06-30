<template>
<div>
    <h1>用户管理</h1>
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