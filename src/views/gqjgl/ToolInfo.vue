<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-05-20 19:56:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-17 22:38:50
--> 
<template>
  <div class="app-container">
    <el-card class="box-card page-info" v-loading="loading">
      <div slot="header" class="clearfix">
        <h4 class="info-title">工具名称：{{datalist.name}}</h4>
        <!-- <el-tag type="success">{{datalist.status===1?'可用':'不可用'}}</el-tag> -->
      </div>
      <el-form label-position="right" class="order-info" >
        <el-row>
           <el-col :span="12">
            <el-form-item label="工具名称：">
              <span>{{datalist.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工具描述：">
              <span>{{datalist.desc}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="ID：">
              <span>{{datalist.id}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工具类型：">
              <span>{{datalist.toolType}}</span>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">
            <el-form-item label="计量单位：">
              <span>{{datalist.calcType}}</span>
            </el-form-item>
          </el-col>
         </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工具图片：">
          <silentbox-single :src="datalist.toolImg" description="工具图片">
            <span class="card-item" v-if="datalist.toolImg">
              <img :src="datalist.toolImg">
            </span>
          </silentbox-single>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from 'utils'
import {getTools} from 'src/api/tool.js'

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
  getTools({id:this.$route.query.id}).then(res =>{
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
