<template>
    <el-container id="navigation">
        <el-menu default-active="" class="el-menu-vertical-demo" :collapse="false">
            <el-menu-item index="1" @click="$router.push('/Home')">
                <template slot="title" >
                    <i class="el-icon-location"></i>
                    <span slot="title" >首页</span>
                </template>
            </el-menu-item>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title" >用户管理</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item index="2-1" @click="$router.push('/Home/UserList')">用户列表</el-menu-item>
                    <el-menu-item index="2-2" @click="$router.push('/Home/ChangeRole')" :disabled="cantChangeRole">设置角色</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                    <span slot="title">客户订单</span>
                    <el-menu-item index="2-4-1">订单详情</el-menu-item>
                </el-submenu>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title" >购物车管理</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item index="3-1" @click="$router.push('/Home/ShoppingCart')">我的购物车</el-menu-item>
                    <el-menu-item index="3-2" >客户介绍</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="3-4">
                    <span slot="title">客户订单</span>
                    <el-menu-item index="3-4-1">订单详情</el-menu-item>
                </el-submenu>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">站点管理</span>
                </template>
            </el-submenu>

        </el-menu>
    </el-container>
</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
                isCollapse: true,
                cantChangeRole:false,
                /*props:{
                    user:{
                        type:Object
                    }
                }*/
            };
        },
        created() {

        },
        mounted() {
            this.getPermissions();
        },
        methods: {
            getPermissions(){
                if (this.$store.state.login.permissions.includes('CHANGE_ROLE')===false){
                    this.cantChangeRole=true;
                }
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>

    #navigation .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 100%;
        height: 100%;
        min-height: 400px;
        text-align: left;
    }



</style>
