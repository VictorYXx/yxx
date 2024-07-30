<!-- <template>
  <div class="box">
    <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
    <el-button type="success" size="small" :icon="Edit">编辑按钮</el-button>
    <el-button type="danger" size="default" :icon="Delete">删除按钮</el-button>

    <el-pagination
    :page-size="20"
    :pager-count="11"
    layout="prev, pager, next"
    :total="1000"
  />
  <Test></Test>
  </div>
</template>
<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import Test from '@/components/Test.Vue'
const str = "我爱你祖国";
</script>
<style scroped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background: black;

  h1 {
    color: white;
  }
}
</style> -->
<!-- 
<template>
  <div>
    <h1>SVG测试</h1>
    <svg style="width: 30px;height:30px;">
      <use xlink:href="#icon-phone" fill="yellow"></use>
    </svg>
      <svg-icon name="lock"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
</script>

<style scoped lang="scss">
 div{
  h1{
    color:$color
  }
 }
</style> -->

<!-- <template>
  <div>
    <h1>测试axios二次封装</h1>
  </div>
</template>
<script setup lang="ts">
import request from '@/utils/request'
import { onMounted } from 'vue';
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111'
    }
  }).then(res=>{
    console.log(res);
  })
})
</script>
<style scroped></style> -->

<!-- <template>
  <div>
    <h1>测试axios二次封装</h1>
  </div>
</template>
<script setup lang="ts">
import {onMounted} from 'vue';
import { reqLogin } from './api/user';
onMounted(()=>{
  reqLogin({username:'admin',password:'111111'})
})
</script>
<style scroped></style> -->

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
