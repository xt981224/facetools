<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-05-20 19:56:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-26 12:16:56
--> 
<template>
  <div class="app-container"  v-loading="loading">
    <!-- <el-card class="box-card page-info"> -->
     
      <el-form label-position="right" class="order-info" ref="createVehicleForm" :model="createVehicleForm" :rules="rules" >
        <el-row>
           <el-col :span="8">
            <el-form-item label="授权结束时间:"  prop="authEndTime">
              <el-date-picker type="datetime"  placeholder="授权结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="createVehicleForm.authEndTime" style="width:180px;" :editable="false"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item >
             <el-button type="primary" @click="submitForm('createVehicleForm')">提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    <!-- </el-card> -->
  </div>
</template>

<script>
import { parseTime } from 'utils'
import {getFaceUser,updateUser} from 'src/api/faceuser.js'
export default {
  name: 'carrierInfo',
  data() {
    return {
      datalist:[],
      loading:false,
      createVehicleForm:{},
       rules:{
         authEndTime: [
          {type: 'date', required: true, message: '请输入授权结束时间', trigger: 'change' }
        ],
       }
    }
  },
  computed: {
  },
  created() {
  this.getinfo()
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
        this.loading = true
        updateUser({authEndTime:this.createVehicleForm.authEndTime,id:this.$route.query.id}).then(res =>{
          if(res.data.code===200){
            this.loading = false
            this.$message.success("成功",2)
            this.$router.push({path:'/faceuser/list'})

          }else{
            this.loading = false
            this.$message({
          message: res.data.message,
          type: 'error'
        })
            // this.$message.error(res.data,message,2)
          }
        })


        }else{
          return false;
        }
      })
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
