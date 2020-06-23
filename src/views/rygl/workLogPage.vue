<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-16 19:19:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-21 13:17:31
--> 
<template>
	<div class='app-container'>
    <div class="filter-container">
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
      <el-table-column align="center" prop="userName" label="姓名"  />
      <el-table-column align="center" prop="userMobile" label="电话" min-width="120px" />
      <el-table-column align="center" prop="userIdCard" label="身份证号" min-width="180px" />
      <el-table-column align="center" prop="company" label="单位" min-width="100px" />
      <el-table-column align="center" prop="department" label="部门" min-width="100px" />
      <el-table-column align="center" prop="checkInTime" label="登记时间" min-width="150"  >
               <template slot-scope="scope">
                  <span >
                    {{moment(scope.row.checkInTime).format('YYYY-MM-DD hh:mm')}}
                  </span>
                </template>
              </el-table-column> 
            <el-table-column align="center" prop="checkOutTime" label="撤销时间" min-width="150"  >
            <template slot-scope="scope">
                  <span >
                    {{moment(scope.row.checkOutTime).format('YYYY-MM-DD hh:mm')}}
                  </span>
                </template>
              </el-table-column>
             <el-table-column align="center" prop="toolNames" label="工具" min-width="180px" >
              <template slot-scope="scope">
                  <span >
                    <pre>{{scope.row.toolNames}}</pre>
                  </span>
                </template>
              </el-table-column>
      <el-table-column align="center" prop="state" label="登记状态"  />


      <el-table-column align="center" label="操作" min-width="200px">
        <template slot-scope="scope">
          <!-- <el-button
            v-handle="'brands:delete'"
            type="danger"
            size="small"
            @click.native="handleDel(scope.row.id)"
            >删除</el-button> -->
             <router-link
              v-handle="'orders:info'"
                :to="{ path: 'workloginfo', query: { id: scope.row.id } }"
              >
                <el-button type="info" size="small">查看</el-button>
              </router-link>
                 <router-link
              v-handle="'orders:info'"
                :to="{ path: 'workloginfo', query: { id: scope.row.id } }"
              >
                <el-button type="info" size="small">编辑</el-button>
              </router-link>
                 <router-link
              v-handle="'orders:info'"
                :to="{ path: 'workloginfo', query: { id: scope.row.id } }"
              >
                <el-button type="info" size="small">撤销</el-button>
              </router-link>
              
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="!listLoading" :page-size="listQuery.size" :page-sizes="[10,20,30]" :current-page.sync="listQuery.current" :total="total" @size-change="handleSizeUpdate" @current-change="handleCurrentUpdate" layout="total,sizes,prev,pager,next,jumper"></el-pagination>
    </div>
    <router-link
              v-handle="'orders:info'"
                :to="{ path: '/ydjrdj' }"
              >
                <el-button type="info" size="small">移动端</el-button>
              </router-link>
	</div>
</template>
<script>
import {workLogPage,deleteWorkLog} from 'src/api/worklog.js'
export default {
	name:'index',
	data() {
		return {
      listLoading:false,
      clientList: [],
      total: null,
      pages: null,
      listQuery:{
        cardId:'',
        realname:"",
        current: 1,
        size: 10
      }
		}
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeUpdate(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentUpdate(val) {
      this.listQuery.current = val
      this.getList()
    },
    //  handleDel(id) {
    //   this.$confirm('此操作将永久删除, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       deleteWorkLog({ id: id })
    //     .then((response) => {
    //       const resData = response.data;
    //       if (resData.success) {
    //         this.$message({
    //           message: "删除成功！",
    //           type: "success",
    //         });
    //         this.getList();
    //       } else {
    //         this.$message.error(resData.message);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });          
    //     });
      
    // },
    getList(){
      this.listLoading = true
      workLogPage(this.listQuery).then((res) =>{
        console.log(res)
        if(res.data.code!==200){
        this.listLoading = false
        this.$message.error(res.data.message,2)
        }else{
          this.clientList = res.data.data.records
          this.total = res.data.data.total;
            this.pages = res.data.data.pages;
            this.listQuery.current = res.data.data.current;
            this.listQuery.size = res.data.data.size;
        this.listLoading = false

          console.log(this.clientList)
        }
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
</style>
