<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-16 19:19:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-27 10:06:01
--> 
<template >

	<div id="box" v-loading="listLoadingBox" >
            <div class="item">
							<el-card class="box-card page-info" >
								<div slot="header" class="clearfix">
									<h4 style="float:left" class="info-title">{{title}}</h4>
									<el-tag style="float:right" type="success">IP：{{this.$route.query.ip}}</el-tag>
								</div>

								<el-form ref="createVehicleForm" :model="createVehicleForm"  label-width="100px" :rules="rules">
									<el-row>
										<el-col :span="4" :xs="24" style="padding: 20px" class="imgflagxs" >
											<img style="width:100%;text-align:right" :src="createVehicleForm.checkFace"/>
										</el-col>
										<el-col :span="18" :xs="24" >
									<el-row>
										<el-col :span="12" :xs="24" >
											<el-form-item label="姓名：">
												<span>{{createVehicleForm.userName}}</span>
											</el-form-item>
										</el-col>
										<el-col :span="12" :xs="24" >
											<el-form-item label="身份证号：">
												<span>{{createVehicleForm.userIdCard}}</span>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12" :xs="24" >
											<el-form-item label="登记时间：">
												<span>{{date}}</span>
											</el-form-item>
										</el-col>
										<el-col :span="12" :xs="24" >
											
											<el-form-item label="联系方式：" prop="userMobile">
												<el-input v-model="createVehicleForm.userMobile" placeholder="请输入联系方式"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12" :xs="24" style="margin-top: 12px" >
											<el-form-item label="单位：">
												<el-input v-model="createVehicleForm.company" placeholder="请输入单位"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12" :xs="24" >
											<el-form-item label="部门：">
												<el-input v-model="createVehicleForm.department" placeholder="请输入部门"></el-input>

											</el-form-item>
										</el-col>
									</el-row>
									
										</el-col>
										<el-col :span="4" :xs="24" style="padding: 20px" class="imgflagclass" >
																						<img style="width:100%;text-align:right" :src="createVehicleForm.checkFace"/>
										</el-col>
									</el-row>
									<el-row v-for="(domain, index) in createVehicleForm.toolList" :key="domain.index"
													>
											<el-col :span="9" :xs="17" >
												<el-form-item 
												 :label="'选择工器具'"
													>
													<el-select   v-model="domain.toolId" @change="toolschange"  placeholder="请选择工器具">
														<el-option
														v-for="item in options"
														:key="item.id"
														:label="item.name"
														:value="item.id">
													</el-option>
													</el-select>
												</el-form-item>
										</el-col>
										<el-col :span="3" :xs="4" style="margin-left:20px">
													<el-button v-if="isshow" type="primary" @click="addtool(domain.toolId)">添加</el-button>
										</el-col>
									</el-row>
									<!-- <el-row class="addtoos">
										<el-col :span="9" :xs="24" >
											<el-form-item label="工器具名称">
												<el-input v-model="tools.toolName" style="width:171px"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="4" :xs="17" style="margin-left:20px" >
											<el-upload  type="drag" ref="upload" :headers="{Accept:'application/json, text/plain, */*'}" action="#" :http-request="upload1" :on-success="uploadSuccesssfz1"
												:on-remove="handleRemove" style="width:300px;" list-type="picture" :file-list="fileList">
												<el-button v-if="isshow" type="primary">点击上传</el-button>
											</el-upload>
										</el-col>
												<el-col :span="3" :xs="4">
															<el-button v-if="isshow" type="primary" @click="addtoolone">保存</el-button>
												</el-col>
								  </el-row> -->

									<el-row class="addtoosxs">
										<el-col :span="9" :xs="24" >
											<el-form-item label="新增工器具">
												<el-input v-model="tools.toolName" placeholder="请填写工器具" style="width:153px"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="4" :xs="24" style="margin-left:20px;margin-top:20px;text-align: center;" >
											<el-upload  type="drag" ref="upload" :headers="{Accept:'application/json, text/plain, */*'}" action="#" :http-request="upload1" :on-success="uploadSuccesssfz1"
												:on-remove="handleRemove" style="width:300px;" list-type="picture" :file-list="fileList">
												<div>
												<el-button v-if="isshow" type="success" width="100%">上传图片</el-button>
												<el-button v-if="isshow" type="primary" @click.stop="addtoolone">添加</el-button>
												</div>
											</el-upload>
										</el-col>
												
								  </el-row>
										<el-row style="margin-top:30px" class="addtoos">
											<el-form-item label="">
											<el-button v-if="isshow" type="primary" @click="submitForm('createVehicleForm')">提交登记</el-button>
											</el-form-item>
										</el-row>
										<el-row style="margin-top:30px;text-align:center" class="addtoosxs" >
											<el-button v-if="isshow" style="width:80%;" type="primary" @click="submitForm('createVehicleForm')">提交登记</el-button>
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
											type="danger"
											size="small"
											@click.native="handleDel(scope.row.toolImg)"
											>删除</el-button>
											<!-- <router-link
											
													:to="{ path: 'faceinfo', query: { id: scope.row.id } }"
												>
													<el-button type="info" size="small">查看</el-button>
												</router-link> -->
											
									</template>
								</el-table-column>
							</el-table>
							</el-card>
						</div>
        </div>
</template>
<script>
import {isvalidPhone} from './validate'
import {addOrUpdateWorkLog,getLatest} from 'src/api/worklog.js'
import {toolsListss,uolad} from 'src/api/tool.js'
import { uploadUri } from 'utils'
import axios from 'axios'
import imgs from '../../assets/face1.jpeg'
var validPhone=(rule, value,callback)=>{
      if (!value){
          callback(new Error('请输入电话号码'))
      }else  if (!isvalidPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
          callback()
      }
  }
export default {
	name:'index',
	data() {
		return {
			
			listLoadingBox:false,
			listLoading:false,
			clientList:[],
			isshow:false,
			fileList:[],
			createVehicleForm:{
				calcType: "",
				id: 0,
				state: "1",
				takeImg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				toolId: 0,
				// toolImg: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				toolList: [{toolName:'',toolId:'',toolImg:""}],
				userId: "",
				userIdCard: "",
				userMobile: "",
				userName: "",
				checkFace:imgs,
				userPhoto: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
			},
			rules: {
          userMobile: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            { max: 11, message: '电话长度大于11', trigger: 'blur' }
          ],
        },
			tools:{toolName:'',toolId:'',toolImg:""},
			options: [],
				value: '',
				flag :false,
				imginfo:'',
				img:'',
				flagupload:true,
				date:'',
				title:'暂无数据__正在请求',
		}
	},
	created() {
		 // 	
		this.getlist()
		this.getLatestInfo()
	
	},
	computed: {
    uploadUri() {
      return uploadUri
    }
  },
	methods: {
		checkPhone(rule, value, callback) {
        if (!value) {
          callback()
        } else {
          const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
          console.log(reg.test(value))
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      },
		getLatestInfo(){
			var _this = this
		
					//清除interval定时器
			getLatest({ip:_this.$route.query.ip}).then(res =>{
					if(res.data.code===200){
						if(res.data.data===undefined){
						_this.getLatestInfotwo()
						}else{
								_this.date = new Date()
    					_this.date = _this.moment(_this.date).format('YYYY-MM-DD hh:mm:ss')
							_this.createVehicleForm.userName = res.data.data.realname
							_this.createVehicleForm.entryId = res.data.data.id
							_this.createVehicleForm.checkFace = 'data:image/jpg;base64,'+res.data.data.checkFace
							_this.img = res.data.data.checkFace
							_this.createVehicleForm.userId = res.data.data.userId

							_this.createVehicleForm.userIdCard = res.data.data.idCard
						_this.title = '最新数据'
						_this.isshow = true
						 
						}
					}else{
					}
				})

		},
		getLatestInfotwo(){
			var _this = this
			var intervalBox = setInterval(function(){
					//清除interval定时器
			getLatest({ip:_this.$route.query.ip}).then(res =>{
					if(res.data.code===200){
						if(res.data.data===undefined){
							_this.title = '暂无数据__正在请求'
							_this.isshow = false
						}else{
							_this.createVehicleForm.userName = res.data.data.realname
							_this.createVehicleForm.userIdCard = res.data.data.idCard
							_this.createVehicleForm.entryId = res.data.data.id
							_this.createVehicleForm.checkFace = 'data:image/jpg;base64,'+res.data.data.checkFace
							_this.img = res.data.data.checkFace
							_this.createVehicleForm.userId = res.data.data.userId

							_this.date = new Date()
    					_this.date = _this.moment(_this.date).format('YYYY-MM-DD hh:mm:ss')
							_this.title = '最新数据'
							_this.isshow = true

						 clearInterval(intervalBox);
						}
					}else{
					clearInterval(intervalBox);
					}
				})
}, 10000);

		},


		// submitUpload() {
		// 	var _this = this
    //     _this.$refs.upload.submit();
    //   },
		submitForm(formName){
      console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
						this.createVehicleForm.checkFace = this.img
					this.createVehicleForm.checkInTime = new Date()
					this.createVehicleForm.checkInTime = this.moment(	this.createVehicleForm.checkInTime).format('YYYY-MM-DD hh:mm:ss')
					this.listLoadingBox = true
					this.createVehicleForm.toolList = this.clientList
					console.log(this.createVehicleForm.entryId)
					//  axios.post(process.env.BASE_API+'/workLog/addOrUpdateWorkLog?'+'entryId='+this.createVehicleForm.entryId, this.createVehicleForm
					// 		).then((res) => {
					// 			this.img = window.URL.createObjectURL(res.data);
					// 			this.listLoadingBox = false

					// 		})
          addOrUpdateWorkLog(this.createVehicleForm).then((res) =>{
          console.log(res)
          if(res.data.code!==200){
				this.listLoading = false
					this.listLoadingBox = false
				
        this.$message.error(res.data.message,2)
        }else{
        this.$message.success('新增成功',2)

					this.listLoadingBox = false
					setTimeout(() => {
        this.$router.go(0)
					}, 1000);

        }
          })
        }else{
          console.log('error submit!!')
          return false;
        }
    })
		},
		toolschange(val){
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
			// console.log(res)
			for (let index = 0; index < this.clientList.length; index++) {
				const element = this.clientList[index];
				if(res===element.toolImg){
				this.clientList.splice(index,1)
				}
			}
			
		},
		addtoolone(){
			this.$refs.upload.submit();


			const info={toolName:this.tools.toolName,toolId:'',toolImg:this.imginfo}
			this.clientList.push(info)
			this.tools.toolName = ''
			this.$refs['upload'].clearFiles()

		},
		getlist(){
			toolsListss().then(res =>{
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

			// this.$refs.upload.clearFiles()
			
					this.listLoadingBox = false

    })
  },
	},
}
</script>
<style lang="less">
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
</style>