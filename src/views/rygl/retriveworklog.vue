<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-05-20 19:56:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-27 11:54:50
--> 
<template>
  <div class="app-container">
    <el-card class="box-card page-info" v-loading="loading">
      <div slot="header" class="clearfix">
									<h4 style="float:left" class="info-title">{{datalist.userName}}</h4>
									<el-tag style="float:right" type="success">{{datalist.state}}</el-tag>
								</div>
                <el-form label-position="right" class="order-info" >
        <el-row>
           <el-col :span="12">
            <el-form-item label="用户名字：">
              <span>{{datalist.userName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登记时间：">
              <span> {{moment(datalist.checkInTime).format('YYYY-MM-DD hh:mm')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户ID：">
              <span>{{datalist.userId}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户身份证：">
              <span>{{datalist.userIdCard}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工具名称：">
              <span>{{datalist.toolNames}}</span>
            </el-form-item>
          </el-col>
          
         </el-row>
         <el-row>
         </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户图片：">
          <silentbox-single :src="datalist.userPhoto" description="用户图片">
            <span class="card-items" v-if="datalist.userPhoto">
              <img :src="datalist.userPhoto" style="width:40%">
            </span>
          </silentbox-single>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="工具图片：">
          <silentbox-single :src="datalist.toolImg" description="工具图片">
            <span class="card-item" v-if="datalist.toolImg">
              <img :src="datalist.toolImg">
            </span>
          </silentbox-single>
            </el-form-item>
          </el-col> -->
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="持有工器具图片：">
          <silentbox-single :src="datalist.takeImg" description="持有工器具图片">
            <span class="card-item" v-if="datalist.takeImg">
              <img :src="datalist.takeImg">
            </span>
          </silentbox-single>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </el-card>
    <el-card class="box-card page-info" v-loading="loading">
      <el-table
								v-loading="listLoading"
								element-loading-text="拼命加载中"
								:data="datalist.toolList"
								border
								fit
								highlight-current-row
								style="width: 100%; margin-top:20px"
								>
								<el-table-column
									type="index"
									width="100"
									label="序号"
									>
                  </el-table-column> 
							
											<el-table-column align="center" prop="toolName"  label="工具名称"  />
                      <el-table-column align="center" prop="state"  label="状态"  />
											<el-table-column align="center" prop="toolImg"  label="工具图片"   >
															 <template slot-scope="scope">
																	<span class="logo-view">
																		<img :src="scope.row.toolImg" alt="" />
																	</span>
																</template>
												</el-table-column> 
								<el-table-column align="center" label="操作" >
									<template slot-scope="scope">
										<el-button
											type="danger"
                      :disabled="!(scope.row.state==='未撤销')"
											size="small"
											@click.native="handleDel(scope.row.id)"
											>撤销</el-button>
									</template>
								</el-table-column>
							</el-table>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from 'utils'
import {workLoginfo,retrive} from 'src/api/worklog.js'

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
         handleDel(id) {
      this.$confirm('是否进行撤销?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          retrive({workLogToolId : id })
        .then((response) => {
          const resData = response.data;
          if (resData.success) {
            this.$message({
              message: "撤销成功！",
              type: "success",
            });
            this.getinfo();
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
            message: '已取消撤销'
          });          
        });

    },
getinfo(){
  this.loading = true
  workLoginfo({id:this.$route.query.id}).then(res =>{
    if(res.data.code === 200&&res.data.success){
      this.datalist = res.data.data
      this.datalist.userPhoto = 'data:image/jpg;base64,'+this.datalist.userPhoto
      console.log(this.datalist)
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
<style lang="less" scope>
@media (max-width: 768px) { 
	
.imgflagclass{
	display: none;
}
.imgflagxs{
	display: block;

}
.addtoos{
	display: none;
}
.addtoosxs{
		display: block;
	}
 }
 @media (min-width: 768px) { 
	.addtoosxs{
		display: none;
	}
.imgflagclass{
	display: block;
}
.imgflagxs{
	display: none;

}
.addtoos{
	display: block;
}
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
							/* text-align: center; */
                min-width:400px;
            }
						
						#box .el-form-item{
							margin-bottom: 10px;
            }
    //         .logo-view {
    //   display: inline-block;
    //   width: 100px;
    //   height: 100px;
    //   line-height: 100px;
    //   overflow: hidden;
    //   border: 1px solid #ccc;
    //   border-radius: 50px;
    //   img {
    //     max-width: 100%;
    //     vertical-align: middle;
    //   }
    // }
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
.card-items {
      display: inline-block;
      width: 50%;
      height: 200px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
</style>