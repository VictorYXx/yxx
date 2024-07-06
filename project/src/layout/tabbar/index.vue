<template>
    <div class="tabbar">
        <div class="tabbar_left">
                 

            <Breadcrum />
        </div>
        <div class="tabbar_right">
            <Setting />
        </div>
    </div>
</template>
<script setup lang='ts'>
import Breadcrum from './breadcrumb/index.vue'
import Setting from './setting/index.vue';
</script>
<script lang="ts">
export default{
    name:"Tabbar"
}
</script>
<style scoped lang='scss'>
.tabbar{
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: space-between;
    background-image: linear-gradient(to right,rgb(232,232,232),rgb(201,178,178),white);
    .tabbar_left
    {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right
    {
        display: flex;
        align-items: center;
    }
}
</style> 