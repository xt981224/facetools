<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-05-20 19:56:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-18 20:58:37
--> 
<template>
  <div class="app-container">
    <el-card class="box-card page-info" v-loading="loading">
      <div slot="header" class="clearfix">
        <h4 class="info-title">姓名：{{datalist.realname}}</h4>
        <!-- <el-tag type="success">{{datalist.status===1?'可用':'不可用'}}</el-tag> -->
      </div>
      <el-form label-position="right" class="order-info" >
        <el-row>
           <el-col :span="12">
            <el-form-item label="姓名：">
              <span>{{datalist.realname}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号：">
              <span>{{datalist.cardId}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别：">
              <span>{{datalist.gender}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名族：">
              <span>{{datalist.nation}}</span>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">
            <el-form-item label="证件类型：">
              <span>{{datalist.cardType}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生年月：">
              <span>{{datalist.birthday}}</span>
            </el-form-item>
          </el-col>
         </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件照片：">
          <silentbox-single :src="datalist.cardFace" description="证件照片">
            <span class="card-item" v-if="datalist.cardFace">
              <img :src="datalist.cardFace">
            </span>
          </silentbox-single>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件地址：">
              <span>{{datalist.identityAddress}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    
  </div>
</template>

<script>
import { parseTime } from 'utils'
import {getFaceUser} from 'src/api/faceuser.js'
export default {
  name: 'carrierInfo',
  data() {
    return {
      datalist:[],
      loading:false,
    }
  },
  computed: {
  },
  created() {
  this.getinfo()
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
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
    }
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
