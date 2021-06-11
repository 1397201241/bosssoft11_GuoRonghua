<template>
    <div class="login-container">
        <!--通过ref给元素（或子组件）注册引用信息，存储在$refs-->
        <!--vm.$refs.loginForm will be this element-->
        <!--:model数据绑定-->
        <!--prop绑定校验字段-->
        <!--:rules传入验证规则-->
        <!--autocomplete自动补全-->
        <!--label-position-->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="login-title">
                <h3 class="title">用户后台管理系统</h3>
            </div>
            <!--用户名-->
            <!--prop传入要检验的属性-->
            <el-form-item prop="username" class="el-form-item">
                <span>
                    <!--<i class="el-icon-user"/>-->
                    <svg t="1613460974953" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3707" width="16" height="16"><path d="M512 288m-224 0a224 224 0 1 0 448 0 224 224 0 1 0-448 0Z" p-id="3708" fill="#e6e6e6"></path><path d="M704 576H320c-105.6 0-192 86.4-192 192s86.4 192 192 192h384c105.6 0 192-86.39 192-192s-86.4-192-192-192z" p-id="3709" fill="#e6e6e6"></path></svg>
                </span>
                <!--v-model实现数据双向绑定，即v-bind="inputValue"&&v-on:input="inputValue=$event.target.value"-->
                <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="请输入用户名"
                        name="username"
                        type="text"
                        tabindex="1"
                        autocomplete="on"
                />
            </el-form-item>
            <!--密码框-->
            <el-tooltip v-model="capsTooltip" content="Caps lock is on" placement="right" manual>
                <el-form-item prop="password">
                    <span>
                        <!--<i class="el-icon-lock"/> -->
                        <svg t="1613461080237" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4717" width="16" height="16"><path d="M780.8 354.58H665.6v-42.89c0-72.31-19.85-193.3-153.6-193.3-138.87 0-153.6 135.05-153.6 193.3v42.89H243.2v-42.89C243.2 122.25 348.79 0 512 0s268.8 122.25 268.8 311.69v42.89z m-192 314.84c0-43.52-34.58-78.65-76.8-78.65s-76.8 35.13-76.8 78.65c0 29.46 15.4 54.47 38.44 67.82v89.64c0 21.74 17.25 39.7 38.4 39.7s38.4-17.96 38.4-39.7v-89.64c23-13.35 38.36-38.36 38.36-67.82zM896 512v393.61c0 65.26-51.87 118.39-115.2 118.39H243.2c-63.291 0-115.2-53.13-115.2-118.39V512c0-65.22 51.87-118.39 115.2-118.39h537.6c63.33 0 115.2 53.17 115.2 118.39z" p-id="4718" fill="#e6e6e6"></path></svg>
                    </span>
                    <!--属性前有冒号表明接一个变量，没有冒号则接的是字符串-->
                    <el-input
                        ref="password"
                        type="password"
                        v-model="loginForm.password"
                        placeholder="请输入密码"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                    />
                </el-form-item>
            </el-tooltip>
            <!--验证码-->
            <el-form-item prop="verificationCode" class="verification-code">
                <span>
                    <svg t="1613985862636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1937" width="16" height="16"><path d="M928 226.133333c0-27.733333-19.2-53.333333-46.933333-59.733333C712.533333 121.6 612.266667 74.666667 533.333333 8.533333c-12.8-10.666667-29.866667-10.666667-40.533333 0-78.933333 66.133333-181.333333 113.066667-349.866667 157.866667-27.733333 6.4-46.933333 32-46.933333 59.733333v366.933334C96 659.2 128 744.533333 170.666667 789.333333c8.533333 10.666667 21.333333 25.6 36.266666 40.533334 29.866667 32 61.866667 59.733333 98.133334 87.466666 64 49.066667 130.133333 83.2 198.4 104.533334 2.133333 0 6.4 2.133333 10.666666 2.133333s6.4 0 10.666667-2.133333c68.266667-21.333333 134.4-57.6 198.4-104.533334 34.133333-25.6 66.133333-55.466667 98.133333-87.466666 14.933333-14.933333 27.733333-29.866667 36.266667-40.533334 42.666667-46.933333 74.666667-130.133333 74.666667-198.4v-211.2c-4.266667-64-4.266667-117.333333-4.266667-153.6z m-64 366.933334c0 49.066667-27.733333 121.6-59.733333 153.6l-2.133334 2.133333c-2.133333 4.266667-12.8 17.066667-32 36.266667-27.733333 29.866667-57.6 55.466667-89.6 78.933333-55.466667 42.666667-110.933333 72.533333-168.533333 91.733333-57.6-19.2-115.2-51.2-168.533333-91.733333-32-23.466667-61.866667-51.2-89.6-78.933333-19.2-19.2-29.866667-32-32-36.266667l-2.133334-2.133333c-32-34.133333-59.733333-104.533333-59.733333-155.733334v-211.2-153.6C320 183.466667 428.8 136.533333 512 72.533333c83.2 64 189.866667 110.933333 352 153.6v366.933334z" fill="#e6e6e6" p-id="1938"></path><path d="M680.533333 360.533333l-204.8 202.666667-70.4-68.266667c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l91.733334 91.733334c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l228.266667-224c12.8-12.8 12.8-32 0-44.8-12.8-12.8-34.133333-12.8-46.933334-2.133334z" fill="#e6e6e6" p-id="1939"></path></svg></span>
                <el-input
                    ref="verificationCode"
                    v-model="loginForm.verificationCode"
                    placeholder="验证码"
                    tabindex="3"
                    maxlength="4"
                    name="verificationCode"
                    autocomplete="off"
                />

            </el-form-item>
            <el-form-item class="vc-icon">
                <canvas id="canvas"
                        ref="code"
                        width="120px"
                        height="42px"
                        style="background-color: #B3C0D1"
                        @click="this.createCode"
                >
                </canvas>
            </el-form-item>
            <!--登录按钮-->
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
                Login
            </el-button>
        </el-form>
    </div>

</template>

<script>
    // import Format from "../../utils/formRule/common";
    export default {
        name: "Login",
        data(){
            /*用户名校验*/
            const validateUsername = (rule,value,callback)=>{
                if (!value){
                    callback(new Error('用户名不能为空'));
                }else{
                    callback();
                }
            };
            /*验证码校验*/
            const validateVerificationCode = (rule,value,callback)=>{
                if (value!==this.verificationC){
                    callback(new Error('验证码错误'));
                }else{
                    callback();
                }
            };
            /*密码校验*/
            const validatePassword = (rule,value,callback)=>{
                //密码正则
                let password=/^[0-9a-zA-Z_]{6,20}$/g;
                if (!value) {
                    return callback(new Error('密码不能为空'))
                }
                if (!password.test(value)) {
                    callback(new Error('请正确填写密码'))
                } else {
                    callback()
                }
            };
            return {
                verificationC:'',
                loginForm:{
                    username:'',
                    password:'',
                    verificationCode:''
                },
                account:[],
                capsTooltip: false,
                loading: false,
                showDialog: false,
                redirect: undefined,
                otherQuery: {},
                loginRules:{
                    username:[
                        { validator:validateUsername,trigger:'blur'},
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
                    ],
                    password:[
                        {
                            // validator:Format.FormValidate.Form().Password,
                            validator:validatePassword,
                            trigger: 'blur'
                        }
                        /*{ min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },*/

                    ],
                    verificationCode:[
                        {
                            validator:validateVerificationCode,
                            trigger:'blur'
                        }
                    ]
                },
            }
        },
        /*watch(){

        },*/
        created:function(){
            // 初始化状态
            this.getAccount();
        },
        mounted() {
            /*if (this.loginForm.username === '') {
                /!*获取焦点*!/
                this.$refs.username.focus()
            } else if (this.loginForm.password === '') {
                this.$refs.password.focus()
            }*/
            this.createCode();
        },
        updated() {
            console.log(this.loginForm.verificationCode)
        },
        destroyed() {
        },
        methods: {
            //获取用户账号密码
            getAccount(){
                fetch('http://localhost:3000/account')
                    .then(res=>res.json())
                    .then(
                        myJson=>{
                            this.account=myJson;
                        }
                    ).catch(err=> console.log(err));
            },
            //登录
            handleLogin() {
                this.$refs['loginForm'].validate(valid=>{
                    if (valid){
                        //用户组
                        let users=[];
                        for (let user of this.account){
                            users.push(user['username'])
                        }
                        //用户存在判断
                        if (users.includes(this.loginForm.username)){
                            for (let user of this.account){
                                if (this.loginForm.username===user['username']&&this.loginForm.password===user['password']){
                                    this.$router.push({
                                        path:'/Home/ItemCard',
                                        query:{
                                            user:user,
                                            // user:user
                                        }
                                    });
                                    this.$notify.success({
                                        title: '登录成功！'
                                    });
                                }
                            }
                        }else {
                            this.$notify.error({
                                title: '用户不存在！'
                            });
                        }
                    }
                    else {
                        this.$notify.error({
                            title: '登录失败！'
                        });
                    }
                });

            },
            // 获得验证码
            createCode () {
                let canvas = this.$refs.code;
                let context = canvas.getContext('2d');
                // eslint-disable-next-line no-unused-vars
                let verification_code="";
                draw();
                console.log(verification_code);
                this.verificationC=verification_code;
                //绘制图形
                function draw() {
                    //每次绘画前，清空画板
                    context.clearRect(0, 0, 120, 42);
                    //顶个边框
                    context.strokeRect(0, 0, 120, 42);
                    //设置随机数选项
                    let aCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a','b', 'c', 'd', 'e', 'f', 'g',
                        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                    //画出随机数
                    for (let i = 0; i < 4; i++) {
                        let x = 20 + 20 * i;
                        let y = 20 + 10 * Math.random();
                        let index = Math.floor(Math.random() * aCode.length);
                        let txt = aCode[index];
                        verification_code+=txt;
                        context.font = 'bold 25px 微软雅黑';
                        context.fillStyle = getColor();
                        console.log(getColor())
                        //从此步开始，为字母旋转
                        context.translate(x, y);
                        let deg = Math.random() * 70 * Math.PI / 180;
                        context.rotate(deg);
                        context.fillText(txt, 0, 0);
                        context.rotate(-deg);
                        context.translate(-x, -y);
                    }
                    /*//设置干扰线 8条
                    for (let i = 0; i < 8; i++) {
                        context.beginPath();
                        context.moveTo(Math.random() * 120, Math.random() * 42);
                        context.lineTo(Math.random() * 120, Math.random() * 42);
                        context.strokeStyle = getColor();
                        context.stroke();
                    }*/
                    //设置干扰点 20 个
                    for (let i = 0; i < 20; i++) {
                        context.beginPath();
                        let x = Math.random() * 120;
                        let y = Math.random() * 42;
                        context.moveTo(x, y);
                        context.lineTo(x + 1, y + 1);
                        context.strokeStyle = getColor();
                        context.stroke();
                    }
                }
                //获取随机颜色
                function getColor() {
                    let r = Math.floor(Math.random() * 256);
                    let g = Math.floor(Math.random() * 256);
                    let b = Math.floor(Math.random() * 256);
                    return `rgb(${r}, ${g}, ${b})`
                }
            },
            //点击切换验证码
            changeCode () {
                this.createCode()
            },
        }

    }
</script>


<style>
    /*登录框*/
    .login-container {
        position: absolute;
        background: #2d3a4b;
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        top:0;
        left:0;
    }
    /*表单容器*/
    .login-container .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px;
        margin: 0 auto;
        overflow: hidden;
    }
    /*标题*/
    .login-container .login-title {
        color: #fff;
    }
    /*边框*/
    .login-container .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        /*background: rgba(0, 0, 0, 0.1);*/
        border-radius: 5px;
    }
    /*输入框*/
    .login-container .el-input {
        width: 85%;
    }
    .login-container .el-input__inner {
        background-color: #2d3a4b;
        border: none;
        color: #fff;
    }
    /*图标*/
    /*.login-container .svg-container {
        !*display: inline-block;*!
    }*/
    .login-container .verification-code{
        float: left;
        width: 260px;
    }
    .login-container .verification-code .el-input{

    }
    .login-container .verification-code .el-form-item__content{
        text-align: left;
        padding-left: 30px;
    }
    .login-container .vc-icon{
        border: none;
        float: right;
        width: 200px;
        height: 42px;
    }

</style>
