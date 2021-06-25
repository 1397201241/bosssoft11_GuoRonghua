<template>
    <el-container id="home" style="height: 722px">
        <!--侧边导航菜单-->
        <!--问题：这里菜单展开时出现X方向的滚动条-->
        <el-aside width="200px" style="height: 722px; overflow-x: hidden">
            <Navigation/>
        </el-aside>

        <el-container>
            <!--top tags-->
            <el-header style=" font-size: 12px">
                <el-breadcrumb separator="/" class="myBreadcrumb">
                    <el-breadcrumb-item :to="{path: '/Home'}">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{breadCrumbTitle}}</el-breadcrumb-item>
                </el-breadcrumb>
                <!--<el-dropdown style="margin-left: 900px;width: 50px">
                    <i class="el-icon-setting"></i>
                </el-dropdown>-->
                <span style="margin-left: 900px;font-size: 18px">你好</span>
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
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        computed:{
            breadCrumbTitle(){
                return this.$route.meta.title
            }
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


</style>
