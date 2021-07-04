<template>

    <el-container id="userList" direction="vertical">
        <queryPanel :queryModel="customerQuery" @QueryButtonClick="onQueryBtnClick">
            <el-form-item label="姓名">
                <el-input v-model="customerQuery.name" style="width: 200px"/>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="customerQuery.mobile" style="width: 200px"/>
            </el-form-item>
        </queryPanel>
        <el-container class="action_bar">
            <el-button type="primary" v-on:click="dialogVisible=true" :class="{addButton:!$store.state.login.permissions.includes('ADD_USER')}" :disabled="!$store.state.login.permissions.includes('ADD_USER')"> 添加</el-button>
            <el-button type="primary">修改</el-button>
            <el-button type="primary">删除</el-button>
            <el-button type="primary">复制</el-button>
            <el-button type="primary">导出</el-button>
        </el-container>
        <el-dialog
                title="添加角色"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">
            <el-form :model="addRoleForm" :rules="rules" ref="ruleForm" label-width="100px" id="addCustomer" class="demo-ruleForm">
                <el-form-item label="角色ID" prop="id">
                    <el-input v-model.number="addRoleForm.id"></el-input>
                </el-form-item>
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="addRoleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="description" prop="tel">
                    <el-input v-model="addRoleForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onAddBtnClick('ruleForm')">立即添加</el-button>
                    <el-button @click="cancelForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                title="角色信息修改"
                :visible.sync="changeVisible"
                width="600px"
                :before-close="handleClose">
            <el-form :model="changeRole" :rules="rules" ref="ruleForm" label-width="100px" id="changeCustomer" class="demo-ruleForm">
                <el-form-item label="角色ID" prop="id">
                    <el-input v-model.number="changeRole.id"></el-input>
                </el-form-item>
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="changeRole.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input v-model="changeRole.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onChangeBtnClick('ruleForm')">立即修改</el-button>
                    <el-button @click="cancelForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table
                :data="roles"
                stripe
                border
                style="width: 800px;border: 1px solid #ebeef5 ;margin: 30px 0 0 90px">
            <el-table-column
                    prop="id"
                    label="不该显示的角色ID"
                    width="180"
                    fixed
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="角色名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="角色描述"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="action"
                    label="操作"
                    fixed="right"
            >
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="changeRow(scope.$index, roles)"
                            type="text"
                            size="small">
                        修改
                    </el-button>
                    <el-button
                            :disabled="!$store.state.login.permissions.includes('DELETE_USER')"
                            @click.native.prevent="deleteRow(scope.$index, roles)"
                            type="text"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-container>
</template>

<script>
    import queryPanel from "../../components/queryPanel/index";
    import {del, get, post, put} from "../../utils/request";

    export default {
        name: "index",
        components: {queryPanel},
        data() {
            return {
                //对话框状态
                dialogVisible:false,
                changeVisible:false,
                //修改的客户姓名，手机号码
                customerQuery:{name:'',mobile:''},
                //客户信息
                roles: [],
                //添加的客户
                addRoleForm: {
                    id:'',
                    name: '',
                    description: '',
                },
                //修改的客户
                changeRole:{
                    ID:'',
                    sex:'',
                    name: '',
                    address: '',
                    tel: ''
                },
                //表单校验
                rules: {
                    id: [
                        { required: true, message: '请输入角色ID', trigger: 'blur' },
                        { type:'number', message: '客户ID须为数值型', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入角色名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        created:function(){
            // 初始化状态
            this.getRoleList();
        },
        mounted() {

        },
        methods: {
            //获取客户列表,更新表格
            getRoleList() {
                get('http://localhost:3000/role')
                    .then(
                        myJson => {
                            this.roles = myJson;
                        }
                    ).catch(err => console.log(err));
            },
            //查询客户
            onQueryBtnClick() {
                let {name, mobile} = this.customerQuery;
                if (name !== '') {
                    get("http://localhost:3000/customer?name=" + name)
                        .then(
                            myJson => {
                                this.roles = myJson;
                            }
                        ).catch(err => console.log(err));
                } else if (mobile !== '') {
                    get("http://localhost:3000/customer?mobile=" + mobile)
                        .then(
                            myJson => {
                                this.roles = myJson;
                            }
                        ).catch(err => console.log(err));
                } else alert("请输入您要查询的名字或手机号码")
            },
            //添加客户
            onAddBtnClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newCustomer = {
                            "id": this.$refs[formName].model.id,
                            "name": this.$refs[formName].model.name,
                            "description": this.$refs[formName].model.description
                        };
                        if (newCustomer) {
                            post("http://localhost:3000/role", newCustomer)
                                .then(
                                    myJson => {
                                        console.log(myJson);
                                        this.getRoleList();
                                    }
                                ).catch(err => console.log(err));
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                //触发父组件的对话框状态修改事件
                this.dialogVisible = false
            },
            //修改客户信息
            onChangeBtnClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newRole={
                            "id": this.$refs[formName].model.id,
                            "name":this.$refs[formName].model.name,
                            "description": this.$refs[formName].model.description
                        };
                        if (newRole){
                            put("http://localhost:3000/customer/"+newRole.id, newRole)
                                .then(
                                    myJson=>{
                                        console.log(myJson);
                                        this.getRoleList();
                                        console.log(this.roles);
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
                let deleteRole=rows[index];
                if (deleteRole){
                    del("http://localhost:3000/role/"+deleteRole.id)
                        .then(
                            myJson=>{
                                console.log(myJson);
                                this.getRoleList();
                                console.log(this.roles);
                            }
                        ).catch(err=> console.log(err));
                }
            },
            //打开修改客户对话框
            changeRow(index, rows) {
                this.changeRole=rows[index];
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
    #userList .action_bar{
        width: 300px;
        margin-left: 90px;
    }
    #userList .addButton{
        background-color: #ccc;
        border-color: #ccc;
    }
</style>
