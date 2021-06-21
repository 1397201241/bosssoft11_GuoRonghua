import {getToken, setToken,} from '../../utils/auth'
import {getInfo} from '../../api/user'
import {get} from "../../utils/request";
// 登录组件状态信息
const state = () => ({
    token:getToken(),
    //账户信息
    account: [],
    //用户信息
    user:[]

});

// getters 相当于计算属性
const getters = {
    user:state=>{
        return state.user
    }
};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    //全体用户账号密码，todo:不安全做法
    SET_ACCOUNT: (state, account) => {
        state.account=account
    },
    //设置用户信息
    SET_USER: (state, user) => {
        state.user.push(user);
    }
};

// actions 内部可以执行异步操作，context.commit()提交mutations来修改状态
const actions = {
    //获取用户账号密码
    getAccount: ({commit}) => {
        get('http://localhost:3000/account').then(res=>{
            commit('SET_ACCOUNT',res)
        }).catch(err=>console.log(err));
    },
    //用户验证
    userAuthentication({commit,state},params) {
        return new Promise((resolve) => {
            //todo:下面需要封装为一个登录的API
            for (let user of state.account){
                //用户匹配判断
                if (params.username===user['username']&&params.decryptPassword===user['password']){
                    //服务端
                    commit('SET_TOKEN',params.username);
                    //客户端
                    setToken(params.username);
                    resolve()
                }
            }
        });
    },
    getInfo(/*{commit,state},params*/{commit,state}) {
        return new Promise(() => {
            //获取token相应的用户信息
            getInfo(state.token)
                .then(response=>{
                    commit('SET_USER',response);
                })
                .catch(err=>{console.log(err)})
        });
    },
    //获取公钥
    getPublicKey(){
        return get('http://localhost:3000/JSEncrypt')
            .then(myJson=>myJson[0].publicKey)
            .catch(err=> console.log(err));
    },
    //获取私钥
    getPrivateKey(){
        return get('http://localhost:3000/JSEncrypt')
            .then(myJson=>myJson[0].privateKey)
            .catch(err=> console.log(err));
    },

};



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
