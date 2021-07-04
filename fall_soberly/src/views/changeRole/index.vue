<template>
    <el-table
            :data="users"
            stripe
            border
            style="width: 1200px;border: 1px solid #ebeef5 ;margin: 30px 0 0 90px">
        <el-table-column
                prop="username"
                label="用户名"
                width="180"
                fixed
        >
        </el-table-column>
        <el-table-column
                prop="rid"
                label="角色ID"
                width="180"
        >
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址"
                width="360"
        >
        </el-table-column>
        <el-table-column
                prop="phone"
                label="手机"
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
                        @click.native.prevent="changeRow(scope.$index, users)"
                        type="text"
                        size="middle">
                    修改角色
                </el-button>

            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {get, put} from "../../utils/request";

    export default {
        name: "index",
        data(){
            return {
                users:[]
            }
        },
        created() {
            this.getUserList();
            console.log(this.users)
        },
        methods:{
            //获取用户列表,更新表格
            getUserList(){
                get('http://localhost:3000/user')
                    .then(
                        myJson=>{
                            this.users=[];
                            for (const item of myJson){
                                let mergeInfo=item;
                                get('http://localhost:3000/user_role?uid='+item.id)
                                    .then(myJson=>{
                                            mergeInfo.rid=myJson[0].rid;
                                            this.users.push(mergeInfo)
                                        }
                                    )
                            }
                        }
                    )
                    .catch(err=> console.log(err));
            },
            changeRow(index, rows) {
                let changeCustomer={};
                get("http://localhost:3000/user_role?uid="+rows[index].id).then(res=>{
                    changeCustomer.id=res[0].id;
                    changeCustomer.rid=2;
                    changeCustomer.uid=rows[index].id;
                    console.log(changeCustomer);
                    put("http://localhost:3000/user_role/"+res[0].id, changeCustomer)
                        .then(myJson=>{
                                console.log(myJson);
                                //刷新
                                this.getUserList();
                            }
                        ).catch(err=> console.log(err));
                });

                //rows.splice(index, 1);
            },
        }
    }
</script>

<style scoped>

</style>
