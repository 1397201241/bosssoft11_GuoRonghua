<template>

    <el-container id="userList" direction="vertical">
        <el-table
                :data="show_item"
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
        <ItemCard @AddItemButtonClick="getCartItem"></ItemCard>
        <!--搜索框-->
        <QueryPanel :queryModel="customerQuery" @QueryButtonClick="onQueryBtnClick">
            <el-form-item label="姓名">
                <el-input v-model="customerQuery.name" style="width: 200px"/>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="customerQuery.mobile" style="width: 200px"/>
            </el-form-item>
        </QueryPanel>
        <el-container class="action_bar">
            <el-button type="primary" v-on:click="dialogVisible=true">添加</el-button>
            <el-button type="primary">修改</el-button>
            <el-button type="primary">删除</el-button>
            <el-button type="primary">复制</el-button>
            <el-button type="primary">导出</el-button>
        </el-container>
        <el-dialog
                title="添加客户"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">
            <el-form :model="addCustomerForm" :rules="rules" ref="ruleForm" label-width="100px" id="addCustomer" class="demo-ruleForm">
                <el-form-item label="客户ID" prop="customerID">
                    <el-input v-model.number="addCustomerForm.customerID"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-input v-model="addCustomerForm.sex"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addCustomerForm.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="addCustomerForm.address"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="tel">
                    <el-input v-model="addCustomerForm.tel"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onAddBtnClick('ruleForm')">立即添加</el-button>
                    <el-button @click="cancelForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                title="客户信息修改"
                :visible.sync="changeVisible"
                width="600px"
                :before-close="handleClose">
            <el-form :model="changeCustomer" :rules="rules" ref="ruleForm" label-width="100px" id="changeCustomer" class="demo-ruleForm">
                <el-form-item label="客户ID" prop="id">
                    <el-input v-model.number="changeCustomer.id"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-input v-model.number="changeCustomer.sex"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="changeCustomer.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="changeCustomer.address" ></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="tel">
                    <el-input v-model="changeCustomer.tel"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onChangeBtnClick('ruleForm')">立即修改</el-button>
                    <el-button @click="cancelForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </el-container>
</template>

<script>
    import ItemCard from "../../views/itemCard/index";
    import QueryPanel from "../../components/QueryPanel/index";
    import Format from "../../utils/formRule/common"
    export default {
        name: "ShoppingCart",
        components: {QueryPanel,ItemCard},
        data() {
            return {
                //选中
                multipleSelection:[],
                //对话框状态
                dialogVisible:false,
                changeVisible:false,
                //修改的客户姓名，手机号码
                customerQuery:{name:'',mobile:''},
                //商品信息（映射）
                items:[],
                //购物车信息
                cart_item: [],
                //需要显示的购物车信息：items||cart_item
                show_item:[],
                //添加的客户
                addCustomerForm: {
                    customerID:'',
                    sex:'',
                    name: '',
                    address: '',
                    tel: ''
                },
                //修改的客户
                changeCustomer:{
                    ID:'',
                    sex:'',
                    name: '',
                    address: '',
                    tel: ''
                },
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
            this.getItems();
            this.getCartItem()
        },
        methods: {
            //选择框
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            //获取商品信息
            getItems(){
                fetch('http://localhost:3000/items')
                    .then(res=>res.json())
                    .then(
                        myJson=>{
                            this.items=myJson;
                        }
                    ).catch(err=> console.log(err));
            },
            //获取购物车信息
            getCartItem(){
                fetch('http://localhost:3000/cart_item')
                    .then(res=>res.json())
                    .then(
                        myJson=>{
                            this.cart_item=myJson;
                            this.getShowItem();
                        }
                    ).catch(err=> console.log(err));
            },
            //生成需要显示的购物车信息show_item
            getShowItem(){
                let {cart_item}=this.$data;
                let {items}=this.$data;
                let show_item=[];
                for (var item of cart_item){
                    for (var i of items){
                        if (i.item_id===item.item_id){
                            item.list_price=i.list_price;
                            item.description=i.description;
                            item.img_path=i.img_path;
                            show_item.push(item)
                        }
                    }
                }
                this.show_item=show_item;
            },
            //查询客户
            onQueryBtnClick(){
                let {name, mobile} = this.customerQuery;
                if (name!==''){
                    fetch("http://localhost:3000/customer?name="+name)
                        .then(response=>response.json())
                        .then(
                            myJson=>{
                                this.cart_item=myJson;
                            }
                        ).catch(err=> console.log(err));
                }else if (mobile!==''){
                    fetch("http://localhost:3000/customer?mobile="+mobile)
                        .then(res=>res.json())
                        .then(
                            myJson=>{
                                this.cart_item=myJson;
                            }
                        ).catch(err=> console.log(err));
                }else alert("请输入您要查询的名字或手机号码")
            },
            //添加客户
            onAddBtnClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newCustomer={
                            "id": this.$refs[formName].model.customerID,
                            "sex":this.$refs[formName].model.sex,
                            "name":this.$refs[formName].model.name,
                            "tel": this.$refs[formName].model.tel,
                            "address": this.$refs[formName].model.address
                        };
                        if (newCustomer){
                            fetch("http://localhost:3000/customer",{
                                method:'POST',
                                body:JSON.stringify(newCustomer),
                                headers:{
                                    'Content-Type':'application/json',
                                },
                            })
                                .then(response=>response.json())
                                .then(
                                    myJson=>{
                                        console.log(myJson);
                                        this.getCustomerList();
                                        console.log(this.cart_item);
                                    }
                                ).catch(err=> console.log(err));
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                //触发父组件的对话框状态修改事件
                this.dialogVisible=false
            },
            //修改客户信息
            onChangeBtnClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newCustomer={
                            "id": this.$refs[formName].model.id,
                            "sex": this.$refs[formName].model.sex,
                            "name":this.$refs[formName].model.name,
                            "tel": this.$refs[formName].model.tel,
                            "address": this.$refs[formName].model.address
                        };
                        if (newCustomer){
                            fetch("http://localhost:3000/customer/"+newCustomer.id,{
                                method:'PUT',
                                body:JSON.stringify(newCustomer),
                                headers:{
                                    'Content-Type':'application/json',
                                },
                            })
                                .then(response=>response.json())
                                .then(
                                    myJson=>{
                                        console.log(myJson);
                                        this.getCustomerList();
                                        console.log(this.cart_item);
                                    }
                                ).catch(err=> console.log(err));
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                //触发父组件的对话框状态修改事件
                this.changeVisible=false
            },
            //删除客户信息
            deleteRow(index, rows) {
                let deleteCustomer=rows[index];
                if (deleteCustomer){
                    fetch("http://localhost:3000/customer/"+deleteCustomer.id,{
                        method:'DELETE',
                        body:JSON.stringify(deleteCustomer),
                        headers:{
                            'Content-Type':'application/json',
                        },
                    })
                        .then(response=>response.json())
                        .then(
                            myJson=>{
                                console.log(myJson);
                                this.getCustomerList();
                                console.log(this.cart_item);
                            }
                        ).catch(err=> console.log(err));
                }
            },
            //打开修改客户对话框
            changeRow(index, rows) {
                this.changeCustomer=rows[index];
                this.changeVisible=true;
                //rows.splice(index, 1);
            },
            //取消按钮
            cancelForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible=false;
                this.changeVisible=false
            },
            //关闭对话框提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(()=> {
                        done();
                    })
                    .catch(()=> {});
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
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
