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
import userList from './views/userList/index';
import roleList from './views/roleList/index';
import shoppingCart from './views/shoppingCart/index';
import changeRole from './views/changeRole/index';
import changePermission from './views/changePermission/index';
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
        path:'/Navigation',component:Navigation,
        /*meta:{title:'导航',requireAuth:true},*/
    },
    {
        path:'/Home',
        meta:{title:'首页',requireAuth:true},
        component:Home,
        children:[
            {
                path:'UserList',
                meta:{title:'用户列表',requireAuth:true},
                component:userList
            },
            {
                path:'ChangeRole',
                meta:{title:'修改用户角色',requireAuth:true},
                component:changeRole
            },
            {
                path:'ChangePermission',
                meta:{title:'修改角色权限',requireAuth:true},
                component:changePermission
            },
            {
                path:'ShoppingCart',
                meta:{title:'购物车管理',requireAuth:true},
                component:shoppingCart
            },
            {
                path:'ItemCard',
                meta:{title:'商品信息',requireAuth:true},
                component:ItemCard
            },
            {
                path:'RoleList',
                meta:{title:'角色列表',requireAuth:true},
                component:roleList
            },
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
        console.log('先跳转');
        let token=getToken();
        if (token) {
            console.log('有token')
            //判断用户信息是否已获取，这里只能通过长度判断
            if (store.state['login'].info.length===0){
                console.log('设置用户信息')
                store.dispatch('login/getInfo').catch(err=>{
                    console.log(err)
                })
            }else{
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
/*
* 1. 实例化一个vue
* 2. 使用render渲染生成（createElement(App)）该实例的HTML模板
*    即<template><App/></template>
* 3. 将改实例挂载到根节点'#app'
* 4. 这之后该实例会替换index.html中的
*    <div id="app"></div>
* 5. 这里已经注入了路由文件，将对应的组件渲染到router-view中
* */
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
