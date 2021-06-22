<template>
    <el-container direction="vertical">
        <label for="select_files" class="select_files" :class="{upLoading:isUploading}">选取文件</label>
        <input type="file" multiple  style="display: none;" id="select_files"
               @change="select_files" ref="file" :disabled="isUploading"/>
        <ul class="img-container">
            <li v-for="(item,index) in imageList" :key="index"
            :style="{background:`url(${item}) no-repeat center/contain`  }"
            ></li>
        </ul>
    </el-container>

</template>

<script>
    import OSS from 'ali-oss'
    /*import {Base64} from 'js-base64'
    import {crypto} from '../../components/Oss/oss-h5-upload-js-direct/lib/crypto1/crypto/crypto'*/
    export default {

        name: 'index',
        data () {
            return {
                client:new OSS({
                    region: 'oss-cn-shenzhen',
                    bucket: 'oss-guoronghua',
                    accessKeyId: 'LTAI5tEQ6MpKJcrgLr5k2ong',
                    accessKeySecret: 'yp0Vm57UQC0ndOjlbD2krtQuANOMBP',

                }),
                imageList:[],
                isUploading:false,
                host: 'https://oss-guoronghua.oss-cn-shenzhen.aliyuncs.com',
                policyText : {
                    "expiration": "2021-08-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
                    "conditions": [
                        ["content-length-range", 0, 10485760000] // 设置上传文件的大小限制
                    ]
                },
            }
        },
        created() {

        },
        methods:{

            // eslint-disable-next-line vue/no-dupe-keys
            select_files(){
                //可选链
                const newFiles=this.$refs?.file?.files;
                //文件数限制
                if (newFiles.length>9){
                    alert('最多选取9张');
                    return false
                }
                const files=[];
                for (const file of newFiles){
                    const fileSize=file.size/1024/1024;
                    if (fileSize>10){
                        alert('文件大于10M');
                        return false
                    }else files.push(file)
                }
                this.uploadFilesByOSS(files)
            },
            uploadFilesByOSS(files){
                this.isUploading=true;
                const uploadRequest=[];
                for (const file of files){
                    uploadRequest.push(new Promise((resolve, reject) => {
                        this.client.put(file.name,file).then(res=>{
                            resolve(res.url)
                        }).catch(err=>{
                            console.log(err);
                            reject(err)
                        })
                    }))
                }
                //成功回调
                Promise.allSettled(uploadRequest).then(res=>{
                    const imgs=[];
                    for (const item of res){
                        if(item.status==='fulfilled'){
                            imgs.push(item.value)
                        }
                    }
                    console.log(res);
                    this.imageList=imgs;
                    this.isUploading=false
                }).catch(err=>{
                    console.log(err)})
            }
        }
    }
</script>
<style scoped>
    .select_files{
        display: block;
        width: 150px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 5px;
        background-color: #45b983;
        color: #fff;
        cursor: pointer;
    }
    .img-container>li {
        list-style: none;
        width: 150px;
        height: 100px;
        float: left;
        margin: 0 30px 30px 0;
        border: 1px solid #ccc;
    }
    .upLoading{
        background-color: #ccc;
    }
</style>


