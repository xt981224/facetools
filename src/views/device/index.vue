<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-16 19:19:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-26 12:26:21
--> 
<template>
	<div class="app-container">
    <!-- <div class="filter-container">
      <el-input
        v-model="listQuery.realname"
        style="width: 200px;"
        class="filter-item"
        placeholder="姓名"
      ></el-input>
      <el-input
        v-model="listQuery.cardId"
        style="width: 200px;"
        class="filter-item"
        placeholder="证件号码"
      ></el-input>
      <el-button
        @click="getList"
        class="filter-item"
        type="primary"
        v-waves
        icon="search"
      ></el-button>
    </div> -->
		<el-table
      v-loading="listLoading"
      element-loading-text="拼命加载中"
      :data="clientList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      >
            <!-- <el-table-column align="center" prop="id" label="ID"  /> -->
            <el-table-column align="center" prop="username" label="用户名称"  />
            <el-table-column align="center" prop="ip" label="IP"  />
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button  type="info" size="small" @click="lookCode(scope.row.ip)">查看二维码</el-button>
          <el-button  type="info" size="small" @click="clickdeviceUser(scope.row.ip)">下发用户</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 查看二维码弹窗 -->
    <el-dialog
      title="二维码"
      :visible.sync="codeDialogVisible"
      size="tiny"
      center>
      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <div class="imgQrCode"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="codeDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
import {deviceList,deviceQrcode,deviceUser} from 'src/api/device.js'
 

export default {
	name:'index',
	data() {
		return {
      codeDialogVisible:false,
      listLoading:false,
      clientList: [],
      total: null,
      pages: null,
      listQuery:{
        realname:'',
        cardId:'',
        current: 1,
        size: 10
      }
		}
  },
  created() {
    this.getList()
  },
  methods: {
    clickdeviceUser(res){
      deviceUser({ip:res}).then(res =>{
        if(res.data.code ===200){
           this.$message({
          message: '下发成功',
          type: 'success'
        })
          this.getList()
        }else{
          this.$message({
          message: res.data.message,
          type: 'error'
        })
        }
      })

    },
     lookCode(ip) {
      this.codeDialogVisible = true
      deviceQrcode({ip: ip}).then(res =>{
        if (res.status == 200) {
          let img = document.querySelector('.imgQrCode img')
          if (img) {
            document.querySelector('.imgQrCode').removeChild(img)
          }
          this.createMiniQrcode(res.data)
        }else {
          this.$message.error(res.message)
        }
      })
    },
    createMiniQrcode (blob) {
      let img = document.createElement('img')
      img.onload = function (e) {
        // 元素的onload 事件触发后将销毁URL对象, 释放内存。
        window.URL.revokeObjectURL(img.src)
      }
      // 浏览器允许使用URL.createObjectURL()方法，针对 Blob 对象生成一个临时 URL。
      // 这个 URL 以blob://开头,表明对应一个 Blob 对象。
      img.src = window.URL.createObjectURL(blob)
      document.querySelector('.imgQrCode').appendChild(img)
    },
    clll(res){
      // 
      // window.open('https://javascript.info/','height=210,   width=500,   top=100,   left=10,')
    window.open('/dyfaceinfo'+'?id='+res,'hahah',   'height=140px,   width=300px,   top=100px,   left=10px,location=no,toolbar=no,menubar=yes,scrollbars=yes,resizable=yes,status=no');
    },
    getList(){
     

      this.listLoading = true
      deviceList().then((res) =>{
        console.log(res.data)
       
          this.clientList = res.data
         this.listLoading = false
          console.log(this.clientList)
      })
    },
  },
}
</script>

<style lang="less">
.logo-view {
  width: 60px;
  height: 60px;
  vertical-align: middle;
  display: inline-block;
  overflow: hidden;
  border-radius: 30px;
  text-align: center;
  border: 1px solid #ddd;
  line-height: 100%;
  img {
    vertical-align: middle;
    max-width: 100%;
  }
}
.imgQrCode{
  text-align: center;
}
.imgQrCode img{
  width: 80%;
}
</style>
