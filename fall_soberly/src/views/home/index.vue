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
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>



<script>

    import Navigation from "../../components/Navigation/index";

    export default {
        name:'Home',
        components: {Navigation},
        comments:{
        },
        data() {
            return {
                user:[],
                isCollapse:true,
            }
        },
        created() {
            console.log(window.screen.width );
            console.log(window.screen.height )
        },
        mounted() {
            this.user=this.$route.query.user
        },
        updated() {

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
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
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
