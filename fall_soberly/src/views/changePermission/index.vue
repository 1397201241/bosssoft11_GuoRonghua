<template>
    <el-table
            :data="role_permissions"
            stripe
            border
            style="width: 840px;border: 1px solid #ebeef5 ;margin: 30px 0 0 90px">

        <el-table-column
                prop="name"
                label="角色名"
                width="180"
        >
        </el-table-column>
        <el-table-column
                prop="description"
                label="角色描述"
                width="180"
        >
        </el-table-column>

        <el-table-column
                label="权限"
                align="center"

        >
            <template slot-scope="scope">
                <el-checkbox-group border="true" size="mini" v-model="role_permissions[scope.$index].permissionsCN" @change="changeRolePermission($event,scope.$index)">
                    <el-checkbox-button  v-for="permission in allPermissionsCN" :label="permission"  :key="permission">{{permission}}</el-checkbox-button>
                </el-checkbox-group>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {get, put} from "../../utils/request";
    const allPermissionsCN = ['添加用户', '修改用户', '搜索用户', '删除用户','修改用户角色'];
    const allPermissions = ['ADD_USER', 'CHANGE_USER', 'SEARCH_USER', 'DELETE_USER','CHANGE_ROLE'];
    export default {
        name: "index",
        data(){
            return {
                role_permissions:[],
                allPermissions,
                allPermissionsCN
            }
        },
        created() {
            this.getRolePermissionList();
        },
        methods:{
            //获取角色对应的权限
            getRolePermissionList(){
                get('http://localhost:3000/role')
                    .then(
                        myJson=>{
                            for (const role of myJson){
                                let mergeInfo=role;
                                get('http://localhost:3000/role_permission?rid='+role.id)
                                    .then(myJson=>{
                                        mergeInfo.permission_id=myJson[0].permission_id;
                                        mergeInfo.rid=myJson[0].rid;
                                        mergeInfo.id=myJson[0].id;
                                        let permissionRequest=[];
                                        let permissions=[];
                                        let permissionsCN=[];
                                        for (const id of myJson[0].permission_id){
                                            permissionRequest.push(
                                                //获取权限ID对应的权限
                                                get('http://localhost:3000/permission/'+id)
                                                    .then(permissionJson=>permissionJson.title)
                                                    .catch(err=>{
                                                        console.log(err)
                                                    })
                                            )
                                        }
                                        Promise.allSettled(permissionRequest).then(res=>{
                                            for (const item of res){
                                                if(item.status==='fulfilled'){
                                                    permissions.push(item.value)
                                                    permissionsCN.push(allPermissionsCN[allPermissions.indexOf(item.value)])
                                                }
                                            }
                                        }).then(()=>{
                                            mergeInfo.permissions=permissions;
                                            mergeInfo.permissionsCN=permissionsCN;
                                            this.role_permissions.push(mergeInfo)
                                        }).catch(err=>{
                                            console.log(err)
                                        });
                                    })
                            }
                        }
                    )
                    .catch(err=> console.log(err));
            },
            //修改角色权限
            changeRolePermission(e,index){
                let permission_id=[];
                for (const permission of e){
                    permission_id.push(allPermissionsCN.indexOf(permission)+1);
                }
                //默认排序
                permission_id.sort();
                let newRolePermission={};
                newRolePermission.id=this.role_permissions[index].id;
                newRolePermission.rid=this.role_permissions[index].rid;
                newRolePermission.permission_id=permission_id;
                console.log(newRolePermission)
                put('http://localhost:3000/role_permission/'+newRolePermission.id, newRolePermission)
                    .then(
                        myJson=>{
                            console.log(myJson);
                        }
                    ).catch(err=> console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
