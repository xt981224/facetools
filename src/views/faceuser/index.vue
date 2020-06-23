<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-16 19:19:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-21 14:14:04
--> 
<template>
	<div class="app-container">
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
            <!-- <el-table-column align="center" prop="id" label="ID"  /> -->
            <el-table-column align="center" prop="realname" label="姓名"  />
            <el-table-column align="center" prop="cardId" label="身份证号"  />
            <el-table-column align="center" prop="gender" label="性别"  />
            <el-table-column align="center" prop="nation" label="民族"  />
            <el-table-column align="center" prop="cardType" label="证件类型"  />
            <el-table-column align="center" prop="birthday" min-width="150px" label="出生日期"  />
            <el-table-column align="center" prop="authStartTime" label="授权日期开始" min-width="130"  >
               <template slot-scope="scope">
                  <span >
                    {{moment(scope.row.authStartTime).format('YYYY-MM-DD hh:mm')}}
                  </span>
                </template>
              </el-table-column> 
            <el-table-column align="center" prop="authEndTime" label="授权截止日期" min-width="130"  >
            <template slot-scope="scope">
                  <span >
                    {{moment(scope.row.authEndTime).format('YYYY-MM-DD hh:mm')}}
                  </span>
                </template>
              </el-table-column> 
      <!-- <el-table-column
        align="center"
        prop="carrierName"
        label="图片"
      > -->
      <!-- <template slot-scope="scope">
          <span class="logo-view">
            <img :src="scope.row.toolImg" alt="" />
          </span>
        </template>
      </el-table-column> -->
   
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button
            v-handle="'brands:delete'"
            type="danger"
            size="small"
            @click.native="handleDel(scope.row.id)"
            >删除</el-button>
             <router-link
              v-handle="'orders:info'"
                :to="{ path: 'faceinfo', query: { id: scope.row.id } }"
              >
                <el-button type="info" size="small">查看</el-button>
              </router-link>
              <router-link
              v-handle="'orders:info'"
                :to="{ path: 'updatetime', query: { id: scope.row.id } }"
              >
                <el-button type="info" size="small">编辑</el-button>
              </router-link>

                 <router-link
                  target="_blank"
              v-handle="'orders:info'"
                :to="{ path: '/dyfaceinfo', query: { id: scope.row.id } }"
              >
              <!-- <a href=‘/dyfaceinfo${scope.row.id}‘ target="view_window"> -->
                <!-- <el-button type="info" size="small">打印</el-button> -->
                <el-button type="info" @click="clll(scope.row.id)" size="small">打印</el-button>
<!-- </a> -->
              </router-link>

              <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="!listLoading" :page-size="listQuery.size" :page-sizes="[10,20,30]" :current-page.sync="listQuery.current" :total="total" @size-change="handleSizeUpdate" @current-change="handleCurrentUpdate" layout="total,sizes,prev,pager,next,jumper"></el-pagination>
    </div>
	</div>
</template>
<script>
import {UserPage,deleteFaceUser} from 'src/api/faceuser.js'
export default {
	name:'index',
	data() {
		return {
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
    clll(res){
      // 
      // window.open('https://javascript.info/','height=210,   width=500,   top=100,   left=10,')
    window.open('/dyfaceinfo'+'?id='+res,'hahah',   'height=140px,   width=300px,   top=100px,   left=10px,location=no,toolbar=no,menubar=yes,scrollbars=yes,resizable=yes,status=no');
    },
handleSizeUpdate(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentUpdate(val) {
      this.listQuery.current = val
      this.getList()
    },
     handleDel(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteFaceUser({ id: id })
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
    getList(){
      this.listLoading = true
      UserPage(this.listQuery).then((res) =>{
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
