<template>
    <el-form :model="customerForm" :rules="rules" ref="ruleForm" label-width="100px" id="addCustomer" class="demo-ruleForm">
        <el-form-item label="客户ID" prop="customerID">
            <el-input v-model.number="customerForm.customerID"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-input v-model="customerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
            <el-input v-model="customerForm.address"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
            <el-input v-model="customerForm.tel"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
            <el-button @click="cancelForm('ruleForm')">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name:'AddCustomer',
        data() {
            return {
                customerForm: {
                    customerID:'',
                    name: '',
                    address: '',
                    tel: ''
                },
                rules: {
                    customerID: [
                        { required: true, message: '请输入customerID', trigger: 'blur' },
                        { type:'number', message: '客户ID须为数值型', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newCustomer={
                            "id": this.$refs[formName].model.customerID,
                            "name":this.$refs[formName].model.name,
                            "ename": "San Zhang",
                            "assistant_code": "zs",
                            "type": "CustomerType",
                            "contacts": 15273166485,
                            "mobile":15273166485,
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
                                        console.log(myJson)
                                    }
                                ).catch(err=> console.log(err));
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                //触发父组件的对话框状态修改事件
                this.$emit("changeDialogVisible",false);
            },
            cancelForm(formName) {
                this.$refs[formName].resetFields();
                this.$emit("changeDialogVisible",false);
            }
        }
    }
</script>
<style>
    #addCustomer{
        width: 480px;
    }
</style>
