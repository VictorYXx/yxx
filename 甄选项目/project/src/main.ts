import { createApp } from 'vue'

import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入路由
import router from './router'
import gloalComponent from '@/components';
import pinia from './store'
createApp(App).mount('#app')
//引入自定义插件对象：注册整个项目全局组件


const app = createApp(App)
//安装自定义插件
app.use(gloalComponent);
import '@/styles/index.scss'
app.use(ElementPlus,{locale:zhCn})
import axios from 'axios';
axios({
    url:'/api/user/login',
    method:"post",
    data:{
        username:'admin',
        password:'1111112'
    }
})
//注册模板路由
app.use(router);
app.use(pinia);
//svg插件需要配置代码
import 'virtual:svg-icons-register'
import './permission';
app.mount('#app')

