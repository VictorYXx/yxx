import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
console.log(ElementPlusIconsVue)
const allGloablComponent={SvgIcon,Pagination,Category};

export default{
    install(app: any)
    {
       Object.keys(allGloablComponent).forEach(key=>{
        app.component(key, allGloablComponent[key]);
       })
       console.log(Object.entries(ElementPlusIconsVue));
       for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    }
}