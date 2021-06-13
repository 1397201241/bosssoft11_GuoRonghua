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

// actions 内部可以执行异步操作，context.commit()提交mutations来修改状态
const actions = {

};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
const mutations = {
    //获取商品信息
    getItems(state) {
        fetch('http://localhost:3000/items')
            .then(res=>res.json())
            .then(
                myJson=>{
                    state.items=myJson;
                }
            ).catch(err=> console.log(err));
    },
    //获取购物车信息
    getCartItems(state){
        fetch('http://localhost:3000/cart_item')
            .then(res=>res.json())
            .then(
                myJson=>{
                    state.cart_item=myJson;
                }
            ).catch(err=> console.log(err));
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
