

// initial state
// shape: [{ id, quantity }]
const state = () => ({
    //商品信息
    items: [],
    //购物车信息
    cart_item: [],
    add_item: [],
    checkoutStatus: null
});

// getters
const getters = {
    getShowItem: state => {
        return state.show_item.filter(item => item.item_id)
    },
    /*cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }*/
};

// actions
const actions = {
    /*checkout ({ commit, state }, products) {
        const savedCartItems = [...state.items]
        commit('setCheckoutStatus', null)
        // empty cart
        commit('setCartItems', { items: [] })
        shop.buyProducts(
            products,
            () => commit('setCheckoutStatus', 'successful'),
            () => {
                commit('setCheckoutStatus', 'failed')
                // rollback to the cart saved before sending the request
                commit('setCartItems', { items: savedCartItems })
            }
        )
    },
*/
    addProductToCart ({ state, commit }, product) {
        commit('setCheckoutStatus', null)
        if (product.inventory > 0) {
            const cartItem = state.items.find(item => item.id === product.id)
            if (!cartItem) {
                commit('pushProductToCart', { id: product.id })
            } else {
                commit('incrementItemQuantity', cartItem)
            }
            // remove 1 item from stock
            commit('products/decrementProductInventory', { id: product.id }, { root: true })
        }
    }
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
