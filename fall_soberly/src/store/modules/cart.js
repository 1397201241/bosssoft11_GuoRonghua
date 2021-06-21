import {get} from "../../utils/request";
// initial state
const state = () => ({
    //商品信息
    items: [],
    //购物车信息
    cart_item: [],
});

// getters 相当于计算属性
const getters = {

};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
const mutations = {
    //设置商品信息
    setItems(state,items) {
        state.items=items
    },
    //设置购物车信息
    setCartItems(state,cart_item){
        state.cart_item=cart_item;
    },
};

// actions 内部可以执行异步操作，context.commit()提交mutations来修改状态
const actions = {
    //获取商品信息
    getItems({commit}) {
        get('http://localhost:3000/items').then(res=>{
            commit('setItems',res)
        }).catch(err=>console.log(err));
    },
    //获取购物车信息
    getCartItems({commit}){
        get('http://localhost:3000/cart_item').then(res=>{
            commit('setCartItems',res)
        }).catch(err=>console.log(err));
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
