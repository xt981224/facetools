<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-16 19:19:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-25 02:06:33
--> 
<template>
	<div class='app-container'>
    <div class="filter-container">
      <el-select  v-model="listQuery.ip"   placeholder="请选择设备IP">
														<el-option
														v-for="item in devicelist"
														:key="item.id"
														:label="item.ip"
														:value="item.ip">
													</el-option>
													</el-select>
      <el-input
        v-model="listQuery.realname"
        style="width: 200px;"
        class="filter-item"
        placeholder="姓名"
      ></el-input>
      <el-input
        v-model="listQuery.idCard"
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
    </div>
		<el-table
      v-loading="listLoading"
      element-loading-text="拼命加载中"
      :data="clientList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" prop="id" label="ID"  />
      <el-table-column align="center" prop="ip" label="设备IP" min-width="120px" />
      <el-table-column align="center" prop="idCard" label="刷卡身份证号" min-width="180px" />
      <el-table-column align="center" prop="realname" label="刷卡真实姓名" min-width="150px" />
      
      <el-table-column align="center" prop="eventTime" label="发生时间" min-width="150"  >
               <template slot-scope="scope">
                  <span >
                    {{moment(scope.row.eventTime).format('YYYY-MM-DD hh:mm')}}
                  </span>
                </template>
              </el-table-column> 
            <el-table-column align="center" prop="addTime" label="新增时间" min-width="150"  >
            <template slot-scope="scope">
                  <span >
                    {{moment(scope.row.addTime).format('YYYY-MM-DD hh:mm')}}
                  </span>
                </template>
              </el-table-column>
     <el-table-column align="center" prop="state" label="处理状态" min-width="100px" />
      <el-table-column align="center" label="操作" min-width="200px">
        <template slot-scope="scope">
          <el-button
          v-if="scope.row.state==='未处理'"
            v-handle="'brands:delete'"
            type="info"
            size="small"
            @click.native="record(scope.row.id)"
            >手持登记</el-button>
            <!-- <router-link
												v-handle="'orders:info'"
													:to="{ path: 'index', query: { ip: scope.row.ip } }"
												>
            <el-button
            v-handle="'brands:delete'"
            type="info"
            size="small"
            @click.native="record(scope.row.ip)"
            >登记</el-button>
            </router-link> -->
          <el-button
            v-handle="'brands:delete'"
            type="danger"
            size="small"
            @click.native="handleDel(scope.row.id)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="pagination-container">
      <el-pagination v-show="!listLoading" :page-size="listQuery.size" :page-sizes="[10,20,30]" :current-page.sync="listQuery.current" :total="total" @size-change="handleSizeUpdate" @current-change="handleCurrentUpdate" layout="total,sizes,prev,pager,next,jumper"></el-pagination>
    </div> -->
	</div>
</template>
<script>
import {deviceentry,deleteById,deviceList,recorddeviceentry} from 'src/api/worklog.js'
export default {
	name:'index',
	data() {
		return {
      devicelist:[],
      listLoading:false,
      clientList: [],
      total: null,
      pages: null,
     
      listQuery:{
        ip:'',
        idCard:'',
        realname:"",
      }
		}
  },
  created() {
    this.getList()
    this.getdeviceList()
    
  },
  methods: {
    getdeviceList(){
      deviceList().then(res =>{
        if(res.status!==200){
          this.$message({
                message: res.message,
                type: 'error'
              })
        }else{
          this.devicelist = res.data
        console.log(this.devicelist)

        }
      })
    },
    // handleSizeUpdate(val) {
    //   this.listQuery.size = val
    //   this.getList()
    // },
    // handleCurrentUpdate(val) {
    //   this.listQuery.current = val
    //   this.getList()
    // },
     handleDel(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById({ id: id })
        .then((response) => {
          const resData = response.data;
          if (resData.success) {
            this.$message({
              message: "删除成功！",
              type: "success",
            });
            this.getList();
          } else {
            this.$message.error(resData.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    record(res){
      recorddeviceentry({ id: res })
        .then((response) => {
          const resData = response.data;
          if (resData.success) {
            this.$message({
              message: "登记成功",
              type: "success",
            });
            this.getList();
          } else {
            this.$message.error(resData.message);
          }
        })
    },
    getList(){
      // this.listLoading = true
      // console.log(this.listQuery)
      // this.listQuery.ip  = '192.168.1.1'
      deviceentry(this.listQuery).then((res) =>{
        if(res.data.code!==200){
        this.listLoading = false
        this.$message.error(res.data.message,2)
        }else{
          console.log(res.data)
          this.clientList = res.data.listData
          this.listLoading = false
        }
      })
    },
  },
}
</script>

<style lang="less">
.filter-container .filter-item{
  margin-bottom: 0;
}
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
</style>
