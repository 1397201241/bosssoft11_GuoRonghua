<template>
    <el-container id="itemCard">
        <el-row :gutter="20">
            <el-col :span="4.8" v-for="(o) in 5" :key="o">
                <el-card :body-style="{ padding: '0px' }" style="width: 200px" shadow="hover"
                         @mouseenter.native="trueItemVisible(o)" @mouseleave.native="falseItemVisible(o)"
                >
                    <img :src="items[o-1].img_path" class="image">
                    <div style="padding: 5px">
                        <span>{{items[o-1].description}}</span>
                    </div>
                    <div style="padding: 5px;color: #ff9270">
                        <span>{{items[o-1].list_price}}元</span>


                    </div>
                    <div class="bottom">
                        <el-button v-show="itemVisible[o-1]" size="mini" @click="addItem(o)">加入购物车</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                items:[],
                itemVisible:[false,false,false,false,false],
                //购物车商品模型
                item_model:{
                    id: 0,
                    username: "test",
                    item_id: "0",
                    quantity: 0
                },
            };
        },
        created:function(){
            // 初始化状态
            this.getItemsList();
            console.log(this.$store.state.cart.items[0].id)
        },
        methods:{
            //修改显示状态
            trueItemVisible(index){
                this.$set(this.itemVisible,index-1,true)
            },
            falseItemVisible(index){
                this.$set(this.itemVisible,index-1,false)
            },
            //获取商品列表
            getItemsList(){
                fetch('http://localhost:3000/items')
                    .then(res=>res.json())
                    .then(
                        myJson=>{
                            this.items=myJson;
                        }
                    ).catch(err=> console.log(err));
            },
            //添加商品至购物车
            addItem(index){
                let item=this.item_model;
                let addItem=this.items[index-1];
                item.id=Math.floor(Math.random()*1000);
                item.item_id=addItem.item_id;
                item.quantity=1;
                //添加至购物车
                fetch("http://localhost:3000/cart_item",{
                    method:'POST',
                    body:JSON.stringify(item),
                    headers:{
                        'Content-Type':'application/json',
                    },
                })
                    .then(response=>response.json())
                    .then(
                        myJson=>{
                            console.log(myJson);
                            this.$emit("AddItemButtonClick")
                            //刷新一次?
                        }
                    ).catch(err=> console.log(err));
                //
                console.log("加了吗")
            }
        }
    }
</script>

<style scoped>
    #itemCard{
        margin-left: 90px;
    }
    #itemCard .bottom {
        height: 28px;
        margin: 5px 0 10px 0;
        line-height: 12px;
    }
    #itemCard .bottom .el-button{
        border-color: #ff9270;
        color: #ff9270;
    }
    #itemCard .bottom .el-button:hover{
        background-color: #ff9270;
        color: #fff;
    }

    .image {
        width: 100%;
        display: block;
    }
    /*.clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }*/
</style>
