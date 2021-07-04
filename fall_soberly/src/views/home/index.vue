<template>
    <el-container id="home" style="height: 722px">
        <!--侧边导航菜单-->
        <!--问题：这里菜单展开时出现X方向的滚动条-->
        <el-aside width="200px" style="height: 722px; overflow-x: hidden;background-color: #304156">
            <el-container class="user-avatar">
                <el-avatar :size="48" :src="avatar_src" style="margin: 4px 15px 4px 20px"></el-avatar>
                <el-container direction="vertical" class="user-info">
                    <span style="padding: 7px 0 1px;color: #fff">{{$store.state.login.token}}</span>
                    <span style="padding: 1px 0 7px;font-size: 15px;color: #fff;font-family:'Helvetica Neue',serif">Web Developer</span>
                </el-container>
            </el-container>
            <Navigation/>
        </el-aside>

        <el-container>
            <!--top tags-->
            <el-header style=" font-size: 12px">
                <el-breadcrumb separator="/" class="myBreadcrumb">
                    <el-breadcrumb-item :to="{path: '/Home'}">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>

                <el-container  style="margin-left: 1000px" >
                    <el-dropdown placement="bottom" style="margin: 6px 15px 6px 20px">
                        <span class="el-dropdown-link">
                            <el-avatar :size="48" :src="avatar_src" ></el-avatar>
                            <i class="el-icon-caret-bottom" style="font-size: 20px"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" style="margin-top: -10px">
                            <el-dropdown-item>黄金</el-dropdown-item>
                            <el-dropdown-item>狮头</el-dropdown-item>
                            <el-dropdown-item ><span @click="logout">注销</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-container>
            </el-header>
            <!--main content-->
            <el-main>
                <el-container v-if="$route.path==='/Home'">
                    <!--<el-form :model="information" :rules="rules" ref="ruleForm" label-width="100px" id="addCustomer" class="demo-ruleForm">
                        <el-form-item label="客户ID" prop="id">
                            <el-input v-model.number="information.id"></el-input>
                        </el-form-item>
                        <el-form-item label="角色" prop="role">
                            <el-input v-model="information.role"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="username">
                            <el-input v-model="information.username"></el-input>
                        </el-form-item>
                        <el-form-item label="地址" prop="address">
                            <el-input v-model="information.address"></el-input>
                        </el-form-item>
                        <el-form-item label="手机" prop="phone">
                            <el-input v-model="information.phone"></el-input>
                        </el-form-item>
                    </el-form>-->
                </el-container>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

    import Navigation from "../../components/Navigation/index";
    import {FormValidate} from "../../utils/validate";
    import {removeToken} from "../../utils/auth";

    export default {
        name:'Home',
        components: {Navigation},
        comments:{
        },
        data() {
            return {
                user:{},
                information: {
                    id:'',
                    sex:'',
                    name: '',
                    address: '',
                    tel: ''
                },
                isCollapse:true,
                avatar_src:'https://i.pinimg.com/236x/3f/e6/d1/3fe6d15edd844b6a47f5b6693cd20dc8.jpg',
                scale_down:"scale-down",
                //表单校验
                rules: {
                    id: [
                        { required: true, message: '请输入customerID', trigger: 'blur' },
                        { type:'number', message: '客户ID须为数值型', trigger: 'blur' }
                    ],
                    role:[
                        { required: true, message: '请输入客户性别', trigger: 'blur' },
                    ],
                    username: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        {
                            required: true,
                            message: '请输入正确的手机号码',
                            trigger: 'blur',validator:FormValidate().Form().Tel
                        },
                    ]
                }
            }
        },
        created() {
            console.log(window.screen.width );
            console.log(window.screen.height );
        },
        mounted() {
            this.user=this.$route.query.user;
            this.getInfo();
        },
        updated() {

        },
        methods:{
            getInfo(){
                console.log(this.$store.state.login.info[0]);
                this.information=this.$store.state.login.info[0]
            },
            logout(){
                console.log("1111111111")
                //清除cookie
                removeToken();
                //清除用户信息
                this.$store.commit('login/SET_INFO',[]);
                //清除权限
                this.$store.commit('login/SET_PERMISSIONS',[]);
                //清除token
                this.$store.commit('login/SET_TOKEN','');
                //跳转
                this.$router.push({
                    path:'/'
                });
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        computed:{

        },
        watch:{
            /*'$route'(to,from){
                this.where=this.$route.meta.title
                console.log(this.$route.meta.title)
                /!*if (to.path==='/Home'){
                    this.where='首页'
                }
                if (to.path==='/Home/UserList'){
                    this.where='客户管理'
                }
                if (to.path==='/Home/ShoppingCart'){
                    this.where='购物车管理'
                }*!/
                console.log(from.path);
            }*/
        }
    };
</script>

<style scoped>


    /*.menu-title{
        padding-left: 0;
    }*/
    #home .el-header {
        background-color: #ebeef5;
        line-height: 60px;
        cursor: pointer;
    }
    #home .el-header .myBreadcrumb{
        float: left;
        line-height: inherit;
        width: 150px;
    }
    #home .user-avatar{
        height: 56px;
        cursor: pointer;
    }
    #home .user-avatar .user-info span{
        height: 28px;
        line-height: 20px;
        text-align: left;
        font-size: 20px
    }


</style>
