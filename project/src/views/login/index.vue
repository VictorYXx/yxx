<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username">
                        </el-input>

                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" show-password
                            v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>

    </div>
</template>
<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue';
import { reactive,ref } from 'vue'
import { useRouter,useRoute } from 'vue-router';
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus';
import {getTime} from '@/utils/time'

let useStore = useUserStore();
let loginForms=ref()
let $router = useRouter();
let $route = useRoute();
//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error('账号长度至少五位'));
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error('密码长度至少六位'));
  }
}
let loginForm = reactive({ username: 'admin', password: '111111' })
const rules = {
    username: [
        // {required:true,message:'用户不能为空',trigger:"blur"},
        // {required:true,min:6,max:10,message:'账号长度至少6位'}
        { trigger: 'change', validator: validatorUserName }
    ],
    password: [
        // required:true,min:6,max:15,message:'密码的长度至少6位',trigger:'change'
        { trigger: 'change', validator: validatorPassword }
    ]
}
let loading = ref(false);
const login = async () => {
    try {
       let result= loginForms.value.validate();
      
    
       console.log(result);
        loading.value = true
        let redirect=$route.query.redirect
        await useStore.userLogin(loginForm);
        $router.push({path:redirect||'/'});
        //编程式导航跳转到展示数据首页
        $router.push('/');
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title:`HI,${getTime()}好`
        })
        loading.value = false
    } catch (error) {
        loading.value = false
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })

    }

}

</script>
<style scoped lang='scss'>
.login_container {
    width: 1920px;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login-form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;
    }

    .login_btn {
        width: 100%;
    }

    h1 {
        color: white;
        font-size: 40px;
    }

    h2 {
        font-size: 20px;
        color: white;
        margin: 20px 0px;
    }
}
</style>