<template>
    <el-container id="navigation">

        <el-menu class="el-menu-vertical-demo" :collapse="false"
                 background-color="#304156"
                 text-color="#fff"
                 active-text-color="#409EFF"
        >
            <el-menu-item index="1" @click="$router.push('/Home')">
                <template slot="title">
                    <i class="el-icon-s-home"></i>
                    <span slot="title" >首页</span>
                </template>
            </el-menu-item>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span slot="title" >用户管理</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item index="2-1" @click="$router.push('/Home/UserList')">用户列表</el-menu-item>
                    <el-menu-item index="2-2" @click="$router.push('/Home/ChangeRole')" :disabled="!$store.state.login.permissions.includes('CHANGE_ROLE')">
                        修改用户角色
                    </el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-3">
                    <span slot="title">用户编辑</span>
                    <el-menu-item index="2-3-1">删除用户</el-menu-item>
                </el-submenu>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title" >角色管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1" @click="$router.push('/Home/RoleList')">角色列表</el-menu-item>
                    <el-menu-item index="3-2" @click="$router.push('/Home/ChangePermission')" :disabled="!$store.state.login.permissions.includes('CHANGE_ROLE')">修改角色权限</el-menu-item>
                    <el-menu-item index="3-3" @click="$router.push('/Home/ChangeRole')" :disabled="!$store.state.login.permissions.includes('CHANGE_ROLE')">添加角色</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-lock"></i>
                    <span slot="title" >权限管理</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item index="4-1" @click="$router.push('/Home/RoleList')">权限列表</el-menu-item>
                    <el-menu-item index="4-2" @click="$router.push('/Home/ChangeRole')" :disabled="!$store.state.login.permissions.includes('CHANGE_ROLE')">修改角色权限</el-menu-item>
                    <el-menu-item index="4-3" @click="$router.push('/Home/ChangeRole')" :disabled="!$store.state.login.permissions.includes('CHANGE_ROLE')">添加权限</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-shopping-cart-2"></i>
                    <span slot="title" >购物车管理</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item index="5-1" @click="$router.push('/Home/ShoppingCart')">我的购物车</el-menu-item>
                    <el-menu-item index="5-2" >客户介绍</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="5-3">
                    <span slot="title">客户订单</span>
                    <el-menu-item index="5-3-1">订单详情</el-menu-item>
                </el-submenu>
            </el-submenu>

            <el-submenu index="6">
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

        },
        methods: {

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
    /*去掉菜单组的title（上下内边距）*/
    #navigation .el-menu-item-group__title{
        padding-top: 0;
        padding-bottom: 0;
    }
    /*#navigation .el-menu-vertical-demo{
        background-color: #304156;
    }
    #navigation .el-menu-vertical-demo span{
        color: #fff;
    }
    #navigation .el-menu-vertical-demo .el-submenu{
        color: #fff;
    }
    #navigation ul li.el-submenu :hover, .is-active {
        background-color: #1f2d3d;
        color: #409EFF;
    }

    #navigation ul li.el-menu-item:focus, li.el-menu-item:hover{
        background-color: #1f2d3d;
        color: #409EFF;
    }
    #navigation ul li ul.el-menu{
        background-color: #ff9270;
    }
    */



</style>
