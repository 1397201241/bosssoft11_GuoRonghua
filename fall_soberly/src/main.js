import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import Login from "./views/login/index";
import Home from "./views/home/index"

import Navigation from "./components/Navigation/index";
import UserList from './views/userList/index';
import ShoppingCart from './views/shoppingCart/index';
import ItemCard from './views/itemCard/index';
import OSS from './components/Oss/index';
import {getToken} from "./utils/auth";


Vue.use(ElementUI);
Vue.use(VueRouter);
//注入store
Vue.use(Vuex);
Vue.config.productionTip = false;

/*路由组*/
const routes=[
    {
        path:'/',component:Login
    },
    {
        path:'/Navigation',component:Navigation
    },
    {
        path:'/Home',
        meta:{title:'首页'},
        component:Home,
        children:[
            {
                path:'UserList',
                meta:{title:'客户管理'},
                component:UserList
            },
            {
                path:'ShoppingCart',
                meta:{title:'购物车管理'},
                component:ShoppingCart
            },
            {
                path:'ItemCard',
                meta:{title:'商品信息',requireAuth:true},
                component:ItemCard
            }
            ,
            {
                path:'OSS',
                meta:{title:'商品信息'},
                component:OSS
            }
        ]
    }
];
/*路由实例*/
const router=new VueRouter(
    {
      routes
    }
);
//全局钩子，路由拦截(权限相关)
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        let token=getToken();
        if (token) {
            //判断用户信息是否已获取，这里只能通过长度判断
            if (store.state['login'].user.length===0){
                store.dispatch('login/getInfo')
            }else{
                console.log(store.state['login'].user.length);
                console.log('有了？')
            }
            next()
        } else {
            next({path: '/'})
        }
    } else {
        next()
    }
});
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
