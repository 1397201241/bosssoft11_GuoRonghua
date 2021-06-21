import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import login from './modules/login'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const store=new Vuex.Store({
    modules: {
        cart,
        login
    },
    strict: debug,
});
export default store
