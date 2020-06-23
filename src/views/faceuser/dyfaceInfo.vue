<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-05-20 19:56:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-21 15:59:29
--> 
<template>
  <div class="app-container" v-loading="listLoadingBox">
      <el-form label-position="right" class="order-info" >
         <el-row>
           <el-col :span="6" style="text-align:right">
                <img width="100px" :src="img" />
           </el-col>
          <div style="max-height:100px">
           <el-col :span="12" style="max-height:100px">
              <el-form label-position="right" label-width="80px" >
                <el-col :span="24" style="height:30px" >
                      <el-form-item label="姓名:">
                      <span>{{datalist.realname}}</span>
                    </el-form-item>
                  </el-col>

                <el-col :span="24" style="height:30px">
                  <el-form-item label="证件类型:">
                  <span>{{datalist.cardType}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="24" style="height:30px" >
                  <el-form-item label="证件号:">
                  <span>{{datalist.cardId}}</span>
                  </el-form-item>
                </el-col>
            </el-form>

            </el-col>
        </div>
        </el-row>
      </el-form>
  </div>
</template>

<script>
import { parseTime } from 'utils'
import {getFaceUser,getimg} from 'src/api/faceuser.js'
import axios from 'axios'

export default {
  name: 'carrierInfo',
  data() {
    return {
      listLoadingBox:false,
      datalist:[],
      loading:false,
      img:"",
    }
  },
  computed: {
  },
  created() {
  this.getinfo()
  this.getimgft()
  },
  filters:{
    timeFilter(val) {
      return parseTime(val)
    },
    dwzt: function (type) {
      const ztm = {
        "1": "企业",
        "2": "车队",
        "3": "个人",
      };
      return ztm[type];
    },
  },
  methods: {
    // axios.get('qrcode')
    getimgft(){
      this.listLoadingBox = true
       axios.get(process.env.BASE_API+'/qrcode?'+'cardId='+this.$route.query.id, {
        responseType: 'blob'
      }).then((res) => {
        this.img = window.URL.createObjectURL(res.data);
        this.listLoadingBox = false

      })
//       getimg({cardId:this.$route.query.id}).then(res =>{
// //         this.setState({
// //   imgCodeUrl: window.URL.createObjectURL(res.data) // 后端返回前端渲染
// //  })
//         // this.img = window.URL.createObjectURL(res.data)
//         // console.log(this.img)
//       })
    },
getinfo(){
  this.loading = true
  getFaceUser({id:this.$route.query.id}).then(res =>{
    if(res.data.code === 200&&res.data.success){
      this.datalist = res.data.data
      this.loading = false
    }else{
      this.$message({
          message: '系统错误',
          type: 'error'
        })
    }
  })
}
  }
}
</script>
<style lang="less">
html,body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
   #box{
                display: flex;
                display: -webkit-flex;
                min-height: 600px;
                width: 100%;
                align-items:center;
                justify-content:center;
            }
            .item{
							 text-align: center;
                min-width:400px;
            }
    .logo-view {
      display: inline-block;
      width: 100px;
      height: 100px;
      line-height: 100px;
      overflow: hidden;
      border: 1px solid #ccc;
      border-radius: 50px;
      img {
        max-width: 100%;
        vertical-align: middle;
      }
    }
    // .el-form-item {
    //   margin-right: 0;
    //   margin-bottom: 0;
    // }
.page-info {
  margin-bottom: 20px;
  .info-title {
    display: inline-block;
    line-height: 36px;
  }
  .el-card__header .el-tag {
    float: right;
    margin: 0 10px;
  }
  .order-info {
    label {
      width: 180px;
      color: #99a9bf;
    }
    .order-img {
      display: inline-block;
      width: 200px;
      height: 118px;
      overflow: hidden;
      border: 1px solid #d1dbe5;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
    }
  }
}
.card-item {
      display: inline-block;
      width: 50%;
      height: 200px;
      overflow: hidden;
      border: 1px solid #d1dbe5;
      img {
        width: 100%;
      }
    }
</style>
