import {defineStore} from "pinia"
import { reqC1 } from "@/api/product/attr"
let useCategoryStore=defineStore('Category',{
    
    state:()=>{
        return {
            c1Arr:[]
        }
    },
    actions:{
        async getC1(){let result:any=await reqC1();
            if(result.code==200)
            {
                this.c1Arr=result.data;
                console.log(111111);
                console.log("c1Arr",this.c1Arr);
            }else
            {
                console.log(222222);
            }
        }
    },
    getters:{

    }
})
export default useCategoryStore;        