<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-16 19:19:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-17 22:30:34
--> 
<template>
	<div>
		<el-table
      v-loading="listLoading"
      element-loading-text="拼命加载中"
      :data="clientList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        align="center"
        prop="name"
        label="工器具名称"
        min-width="180px"
      >
      <!-- <template slot-scope="scope">
       <router-link
          :to="{ path: 'deliveryinfo', query: { id: scope.row.deliveryNo } }"
        >
       <span style="color: #20a0ff;">{{scope.row.deliveryNo}}</span>
      </router-link>
      </template> -->
      </el-table-column>
     
      <el-table-column
        align="center"
        prop="carrierName"
        label="图片"
      >
      <template slot-scope="scope">
          <span class="logo-view">
            <img :src="scope.row.toolImg" alt="" />
          </span>
        </template>
      </el-table-column>
   
      <el-table-column align="center" label="操作" min-width="230">
        <template slot-scope="scope">
          <el-button
            v-handle="'brands:delete'"
            type="danger"
            size="small"
            @click.native="handleDel(scope.row.id)"
            >删除</el-button>
             <router-link
              v-handle="'orders:info'"
                :to="{ path: 'toolsinfo', query: { id: scope.row.id } }"
              >
                <el-button type="info" size="small">查看</el-button>
              </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="!listLoading" :page-size="listQuery.size" :page-sizes="[10,20,30]" :current-page.sync="listQuery.current" :total="total" @size-change="handleSizeUpdate" @current-change="handleCurrentUpdate" layout="total,sizes,prev,pager,next,jumper"></el-pagination>
    </div>
	</div>
</template>
<script>
import {toolsPage,deleteTool} from 'src/api/tool.js'
export default {
	name:'index',
	data() {
		return {
      listLoading:false,
      clientList: [],
      total: null,
      pages: null,
      listQuery:{
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
     handleDel(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTool({ id: id })
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
      toolsPage(this.listQuery).then((res) =>{
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
