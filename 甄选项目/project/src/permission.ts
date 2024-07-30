import router from "./router";
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
nprogress.configure({showSpinner:false})
import useUserStore from "./store/modules/user";
import setting from "./setting";
import pinia from "./store";
import useStore from "element-plus/es/components/table/src/store/index.mjs";
let userStore=useUserStore(pinia);
console.log(userStore);

router.beforeEach(async(to:any,from :any,next:any)=>{
    document.title=`${setting.title}-${to.meta.title}`
    nprogress.start();
    let token=userStore.token;
    let username=userStore.username;
    if(token)
        {
            if(to.path=='/login')
                {
                    next({path:'/'})
                }else
                {
                   if(username)
                    {
                        next();
                    }else
                    {
                        await userStore.userinfo();
                        userStore.userinfo();
                    }
                }
        }
    else{
        if(to.path=='/login')
            {
                next();
            }else
            {
                try{
                next({path:'login',query:{redirect:to.path}})
                }catch(error)
                {
                    userStore.userLogout();
                    next({path:'/login',query:{redirect:to.path}});
                }
            }
    }
    next();
})
router.afterEach((to:any,from:any)=>{
    nprogress.done();
})