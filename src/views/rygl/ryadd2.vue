<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-16 19:19:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-25 17:22:22
--> 
<template >

	<div id="box" v-loading="listLoadingBox" >
            <div class="item">
							<el-card class="box-card page-info" >
								<el-form ref="createVehicleForm" :model="createVehicleForm"  label-width="100px">
									<el-row>
										<el-col :span="18" >
									<el-row>
										<el-col :span="12" >
											<el-form-item label="姓名：">
												<span>王五</span>
											</el-form-item>
										</el-col>
										<el-col :span="12" >
											<el-form-item label="身份证号：">
												<span>32032119990221019</span>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12" >
											<el-form-item label="登记时间：">
												<span>2020-02-20 12:11</span>
											</el-form-item>
										</el-col>
										<el-col :span="12" >
											<el-form-item label="联系方式：">
												<el-input v-model="createVehicleForm.userMobile" placeholder="请输入联系方式"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12" >
											<el-form-item label="单位：">
												<el-input v-model="createVehicleForm.company" placeholder="请输入单位"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12" >
											<el-form-item label="部门：">
												<el-input v-model="createVehicleForm.department" placeholder="请输入部门"></el-input>

											</el-form-item>
										</el-col>
									</el-row>
									
										</el-col>
										<el-col :span="6" style="padding: 20px" >
											<img style="max-width:150px;text-align:right" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
										</el-col>
									</el-row>
									<el-row v-for="(domain, index) in createVehicleForm.toolList" :key="domain.index"
													>
											<el-col :span="9" >
												<el-form-item 
												 :label="'工器具名称'"
													>
													<el-select style="width:170px"  v-model="domain.toolId" @change="toolschange"  placeholder="请选择工器具名称">
														<el-option
														v-for="item in options"
														:key="item.id"
														:label="item.name"
														:value="item.id">
													</el-option>
													</el-select>
												</el-form-item>
										</el-col>
										<el-col :span="3" style="margin-left:20px">
													<el-button v-if="index !== 0" @click="deletool(index)">删除</el-button>
										</el-col>
										<el-col :span="3" style="margin-left:20px">
													<el-button type="primary" @click="addtool(domain.toolId)">保存</el-button>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="9" >
											<el-form-item label="工器具名称">
												<el-input v-model="tools.toolName" style="width:168px"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="4" style="margin-left:20px" >
											<el-upload  type="drag" ref="upload" :headers="{Accept:'application/json, text/plain, */*'}" action="#" :http-request="upload1" :on-success="uploadSuccesssfz1"
												:on-remove="handleRemove" style="width:300px;" list-type="picture" :file-list="fileList">
												<el-button  type="primary">点击上传</el-button>
											</el-upload>
									</el-col>
									<el-col :span="3">
												<el-button type="primary" @click="addtoolone">保存</el-button>
									</el-col>
										</el-row>
										<el-row style="margin-top:30px">
											<el-form-item label="">
											<el-button type="primary" @click="submitForm('createVehicleForm')">提交</el-button>
											</el-form-item>
											<!-- <el-button @click="addDomain">新增域名</el-button> -->
											<!-- <el-button type="primary"  @click="onSubmitadd" >新增</el-button> -->
										</el-row>
											
								</el-form>
							<el-table
								v-loading="listLoading"
								element-loading-text="拼命加载中"
								:data="clientList"
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
											<el-table-column align="center" prop="toolName" width="200" label="工具名称"  />
											<el-table-column align="center" prop="toolImg" width="230" label="工具图片"   >
															 <template slot-scope="scope">
																	<span class="logo-view">
																		<img :src="scope.row.toolImg" alt="" />
																	</span>
																</template>
												</el-table-column> 
								<el-table-column align="center" label="操作" width="200">
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
											
									</template>
								</el-table-column>
							</el-table>
							</el-card>
						</div>
        </div>
</template>
<script>

import {addOrUpdateWorkLog} from 'src/api/worklog.js'
import {toolsList,uolad} from 'src/api/tool.js'
import { uploadUri } from 'utils'

export default {
	name:'index',
	data() {
		return {
			listLoadingBox:false,
			listLoading:false,
			clientList:[],
			fileList:[],
			createVehicleForm:{
				calcType: "件",
				id: 0,
				state: "1",
				takeImg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				toolId: 0,
				toolImg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				toolList: [{toolName:'',toolId:'',toolImg:""}],
				userId: "1",
				userIdCard: "320222222222222222",
				userMobile: "14762161111",
				userName: "测试",
				userPhoto: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			},
			tools:{toolName:'',toolId:'',toolImg:""},
			options: [],
				value: '',
				flag :false,
				imginfo:'',
				flagupload:true
		}
	},
	created() {
		this.getlist()
	},
	computed: {
    uploadUri() {
      return uploadUri
    }
  },
	methods: {
		submitUpload() {
			var _this = this
        _this.$refs.upload.submit();
      },
		submitForm(formName){
      console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
					this.listLoadingBox = true
					this.createVehicleForm.toolList = this.clientList
          addOrUpdateWorkLog(this.createVehicleForm).then((res) =>{
          console.log(res)
          if(res.data.code!==200){
				this.listLoading = false
					this.listLoadingBox = false
				
        this.$message.error(res.data.message,2)
        }else{
					this.listLoadingBox = false

        this.$message.success('新增成功',2)
        this.$router.push({path:'/rygl/list'})
        }
          })
        }else{
          console.log('error submit!!')
          return false;
        }
    })
		},
		toolschange(val){
		console.log(val)
		this.options.forEach(item =>{
				this.createVehicleForm.toolList.forEach(items =>{
			if(val===item.id&&val===items.toolId){

				console.log(item)
				items.toolName =item.name
				items.toolImg =item.toolImg

			}
		})
		})
		},
		deletool(res){
			this.createVehicleForm.toolList.splice(res,1)
		},
		addtool(res){
			const info={toolName:'',toolId:res,toolImg:''}
			this.createVehicleForm.toolList.forEach(items =>{
			if(res===items.toolId){
			info.toolName = items.toolName
			info.toolImg = items.toolImg
			}
		})
			this.clientList.push(info)
			this.createVehicleForm.toolList[0].toolId = ''
			// this.$refs.upload.clearFiles();
      // this.$refs['upload'].clearFiles()
			// this.flagupload = false
			// this.flagupload = true
		},
		handleDel(res){
			this.clientList.splice(res,1)
		},
		addtoolone(){
			// this.$refs.upload.submit();

			
			const info={toolName:this.tools.toolName,toolId:'',toolImg:this.imginfo}
			this.clientList.push(info)
			this.tools.toolName = ''
			this.$refs['upload'].clearFiles()

		},
		getlist(){
			toolsList().then((res) =>{
				const resdata = res.data
				if(res.data.code ===200){
				console.log(resdata.listData)
				this.options = resdata.listData
				}else{
					this.$message.error(resdata.message,2)
				}
			})

		},
		onSubmitadd(){
			const data = {toolName:'',toolId:'',toolImg:""}
			this.createVehicleForm.toolList.push(data)
		},
		handleRemove(file, fileList) {
	  console.log(file)
	  console.log(fileList)
	  this.imginfo = ''
	},
    uploadSuccesssfz1(response, file) {
		console.log(file)
	  if (response.success) {
			this.imginfo = response.data.returnPath
	  }
	},
  upload1(res){

					this.listLoadingBox = true

		var _this = this
    const param1 = new FormData
		param1.append('file', res.file);
		
    uolad(param1).then(response =>{
			this.imginfo = response.data.data.returnPath

			// _this.$refs['upload'].clearFiles()
			
					this.listLoadingBox = false

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
</style>