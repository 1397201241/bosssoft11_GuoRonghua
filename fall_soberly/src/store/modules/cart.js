

// initial state
// shape: [{ id, quantity }]
const state = () => ({

    items: [
        {
            id:1,
            count:0
        }
    ],
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
}

// mutations
const mutations = {
    pushProductToCart (state, index) {
        let item={
            id: 0,
            username: "test",
            item_id: "0",
            quantity: 0
        };
        let addItem=state.items[index-1];
        item.id=Math.floor(Math.random()*1000);
        item.item_id=addItem.item_id;
        item.quantity=1;
        //添加至购物车
        fetch("http://localhost:3000/cart_item",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                'Content-Type':'application/json',
            },
        })
            .then(response=>response.json())
            .then(
                myJson=>{
                    console.log(myJson);
                    this.$emit("AddItemButtonClick")
                    //刷新一次?
                }
            ).catch(err=> console.log(err));
        //
        console.log("加了吗")
        state.add_item.push({
            quantity: 1
        })
    },

    incrementItemQuantity (state, { id }) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantity++
    },

    setCartItems (state, { items }) {
        state.items = items
    },

    setCheckoutStatus (state, status) {
        state.checkoutStatus = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
