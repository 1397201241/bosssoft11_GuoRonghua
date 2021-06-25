<template>

    <el-container id="userList" direction="vertical">
        <el-table
                :data="$store.state.cart.cart_item"
                stripe
                border
                @selection-change="handleSelectionChange"
                style="width: 1200px;border: 1px solid #ebeef5 ;margin: 30px 0 0 90px">
            <el-table-column
                    type="selection"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="商品名称"
                    width="180"
                    fixed
            >
                <!--<img :src="show_item.img_path" style="width: 100%;display: block">-->
            </el-table-column>
            <el-table-column
                    prop="list_price"
                    label="单价"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="quantity"
                    label="数量"
                    width="360"
            >
            </el-table-column>

            <el-table-column
                    prop="action"
                    label="操作"
                    fixed="right"
            >
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="changeRow(scope.$index, cart_item)"
                            type="text"
                            size="small">
                        修改
                    </el-button>
                    <!--todo:删除功能哪去了-->
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, cart_item)"
                            type="text"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-divider>商品列表</el-divider>
        <ItemCard @AddItemButtonClick="getCartItemsList"></ItemCard>
    </el-container>
</template>

<script>
    import ItemCard from "../../views/itemCard/index";
    import Format from "../../utils/validate"
    export default {
        name: "ShoppingCart",
        components: {ItemCard},
        data() {
            return {
                //选中
                multipleSelection:[],
                //表单校验
                rules: {
                    customerID: [
                        { required: true, message: '请输入customerID', trigger: 'blur' },
                        { type:'number', message: '客户ID须为数值型', trigger: 'blur' }
                    ],
                    sex:[
                        { required: true, message: '请输入客户性别', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    tel: [
                        {
                            required: true,
                            message: '请输入正确的手机号码',
                            trigger: 'blur',validator:Format.FormValidate.Form().Tel
                        },
                    ]
                }
            }
        },
        created:function(){
            // 初始化状态
            this.getCartItemsList()
        },
        methods: {
            //选择框
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            //获取购物车列表信息
            getCartItemsList(){
                this.$store.dispatch('cart/getCartItems')
            }
        },
        /*watch:{
            dialogVisible(){
                this.getCustomerList();
                console.log("changed")
                console.log(this.customers)
            }
        }*/
    }
</script>

<style scoped>
    #userList{
        position: relative;
    }
    #userList .el-divider--horizontal{
        width: 1200px;
        margin-left: 90px;
    }
    #userList .el-divider--horizontal .el-divider__text{
        font-size: 30px;
    }
    #userList .action_bar{
        width: 300px;
        margin-left: 90px;
    }
    #userList #itemCard{
        margin-left: 140px;
        /*position: relative;*/
        /*left: 50%;*/
        /*transform: translateX(-50%);*/
    }
</style>
