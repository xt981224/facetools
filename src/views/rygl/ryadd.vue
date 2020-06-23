<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-16 19:19:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-21 00:02:54
--> 
<template >

	<div id="box" >
            <div class="item">
							<el-card class="box-card page-info" >
							<div slot="header" class="clearfix">
								<h4 class="info-title">人员信息</h4>
							</div>
							<img style="max-width:150px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
								<el-form ref="createVehicleForm" :model="createVehicleForm"  label-width="100px">
									<el-row>
										<el-col :span="12" :offset="5">
											<el-form-item label="姓名：">
												<span>王五</span>
											</el-form-item>
										</el-col>
									</el-row>
										<el-col :span="12" :offset="5">
											<el-form-item label="单位：">
												<span>王五</span>
											</el-form-item>
										</el-col>
										<el-col :span="12" :offset="5">
											<el-form-item label="部门：">
												<span>王五</span>
											</el-form-item>
										</el-col>
									<el-row>
										<el-col :span="12" :offset="5">
											<el-form-item label="身份证号：">
												<span>320202020000000000</span>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12" :offset="5">
											<el-form-item label="登记时间：">
												<span>2020-02-20</span>
											</el-form-item>
										</el-col>
										</el-row>
									<el-row>
										
										<el-col :span="12" :offset="5">
											<el-form-item label="进入时间:">
												<span>2020-02-20</span>
											</el-form-item>
										</el-col>
										</el-row>
									<el-row>
										<el-col :span="12" :offset="5">
											<el-form-item label="离开时间:">
												<span>2020-02-20</span>
											</el-form-item>
										</el-col>
										</el-row>
									<el-row v-for="(domain, index) in createVehicleForm.toolList" :key="domain.index"
													>
											<el-col :span="18" >
												<el-form-item 
												 :label="'工器具名称' + index"
													>
													<el-select  v-model="domain.toolId" @change="toolschange"  placeholder="请选择工器具名称">
														<el-option
														v-for="item in options"
														:key="item.id"
														:label="item.name"
														:value="item.id">
													</el-option>
													</el-select>

												</el-form-item>
										</el-col>
										<el-col :span="6" >
													<el-button v-if="index !== 0" @click="deletool(index)">删除</el-button>
										</el-col>
									</el-row>
									<el-row v-if="flag">
										<el-col :span="18" >
											<el-form-item label="工器具名称">
												<el-input v-model="tools.toolName" style="width:168px"></el-input>
												<!-- <el-button type="primary" @click="onSubmit">保存</el-button> -->
											</el-form-item>
										</el-col>
										</el-row>
											<el-button type="primary" @click="submitForm('createVehicleForm')">提交</el-button>
											<!-- <el-button @click="addDomain">新增域名</el-button> -->
											<el-button type="primary"  @click="onSubmitadd" >新增</el-button>
											<el-button @click="addtool">新建</el-button>
								</el-form>
							</el-card>
						</div>
        </div>
</template>
<script>

import {addOrUpdateWorkLog} from 'src/api/worklog.js'
import {toolsList} from 'src/api/tool.js'
export default {
	name:'index',
	data() {
		return {
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
				flag :false
		}
	},
	created() {
		this.getlist()
	},
	methods: {
		submitForm(formName){
      console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
					this.createVehicleForm.toolList.push(this.tools)
          addOrUpdateWorkLog(this.createVehicleForm).then((res) =>{
          console.log(res)
          if(res.data.code!==200){
        this.listLoading = false
        this.$message.error(res.data.message,2)
        }else{
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
		addtool(){
			this.flag = true

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
		}
	},
}
</script>
<style >
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
							text-align: center;
                min-width:400px;
            }
						
						#box .el-form-item{
							margin-bottom: 10px;
						}
</style>