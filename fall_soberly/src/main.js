import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import Login from "./views/login/Login";
import Home from "./views/home/index"

import Navigation from "./components/Navigation/index";
import UserList from './views/userList/index';
import ShoppingCart from './views/shoppingCart/index';
import ItemCard from './views/itemCard/index';


Vue.use(ElementUI);
Vue.use(VueRouter);
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
                meta:{title:'商品信息'},
                component:ItemCard
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

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
