import { defineStore } from 'pinia'
import { reqLogin,reqLogout,reqUserInfo} from '@/api/user'
import type { loginFormData, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token:GET_TOKEN(),
      menuRoutes:constantRoute,
      username:'',
      avator:'' 

    }
  },
  actions: {
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      console.log(result)
      if (result.code == 200) {
        this.token = result.data.token as string
        SET_TOKEN((result.data as string));
        localStorage.setItem('TOKEN', result.data.token as string)
        return 'ok'
        console.log(123)
      } else {
        return Promise.reject(new Error(result.data.message))
        console.log(456)
      }
    },
    async userinfo(){
      console.log(123);
      let result=await reqUserInfo();
      if(result.code==200)
        {
          this.username=result.data.checkUser.username;     
          this.avatar=result.data.checkUser.avatar;     
          return 'ok';
        }else
        {
          return Promise.reject('获取用户信息失败');
        }
      console.log(result);
    },
     async userLogout(){
      let result:any =await reqLogout();
      if(result.code==200){
      this.token='';
      this.username='';
      this.avatar='';
      REMOVE_TOKEN();
      }
    }
  },
  getters: {},
})
export default useUserStore
