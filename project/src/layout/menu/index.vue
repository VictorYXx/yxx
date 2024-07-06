<template>
    <!-- <p>{{menuList}}</p> -->
    <template v-for="(item,index) in menuList" :key="item.path">
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
                <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                <template #title>
                    <span>{{item.meta.title}}</span>
                </template>
            </el-menu-item>
        </template>
        <template v-if="item.children &&item.children.length==1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
            <template #title>
              
                <span>{{item.children[0].meta.title}}</span>
            </template>
        </el-menu-item>

        </template>
        <!-- <el-menu-item v-if="!item.children" :index="item.path">
            <template #title>
                <span>标&nbsp;</span>
                <span>{{item.meta.title}}</span>
            </template>
        </el-menu-item> -->
    
        <el-sub-menu :index="item.path" v-if="item.children&&item.children.length>1">
            <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
            <template #title>
                <span>{{item.meta.title}}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
  
     <!-- <template v-for="(item,index) in menuList" :key="item.path">
      
            <el-menu-item v-if="!item.children" :index="item.path">
                <template>
                    <span>标&nbsp;</span>
                    <span>{{item.meta.title}}</span>
                    </template>
            </el-menu-item>
            <el-menu-item v-if="item.children&&item.children.length==1" :index="item.children[0].path">
                <template #title>
                    <span>{{item.children[0].meta.title}}</span>
                </template>
            </el-menu-item>
            <el-sub-menu :index="item.path" v-if="item.children&&item.children.length>1">
                <template >
                    <span>{{item.meta.title}}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
 

    </template>  -->
<!-- <div>
    <h1>我是动态生成菜单根据项目路由生成1111</h1>
</div> -->

</template>
<script setup lang='ts'>
 defineProps(['menuList']);
 import { useRouter } from 'vue-router';
 let $router=useRouter();
 //点击菜单的回调
const goRoute = (vc: any) => {
   $router.push(vc.index);
}
</script>
<script lang="ts">
export default{
    name:'Menu'
}
</script>
<style scoped lang='scss'>
</style> 