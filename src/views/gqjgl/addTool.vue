<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-16 19:19:15
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-18 17:35:44
--> 
<template>
<div class="app-container">
		<el-form ref="createVehicleForm" :model="createVehicleForm" :rules="rules" label-width="130px">
      <!-- <el-row>
		  <el-col :span="8">
			  <el-form-item label="ID" prop="id">
				<el-input v-model="createVehicleForm.id"  placeholder="请输入ID"></el-input>
			  </el-form-item>
		  </el-col>
       </el-row> -->
      <el-row>
		  <el-col :span="8">
			  <el-form-item label="名称" prop="name">
				<el-input v-model="createVehicleForm.name"  placeholder="请输入名称"></el-input>
			  </el-form-item>
		  </el-col>
      </el-row>
      <el-row>
		  <el-col :span="8">
			  <el-form-item label="工具描述" >
				<el-input v-model="createVehicleForm.desc"  placeholder="请输入工具描述"></el-input>
			  </el-form-item>
		  </el-col>
      </el-row>
      
      <el-row>
		  <el-col :span="8">
			  <el-form-item label="工具类型" prop="toolType">
				<el-select v-model="createVehicleForm.toolType" style="width:272px;"  placeholder="请选择工具类型">
		  			<el-option
          
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
		  </el-select>
			  </el-form-item>
		  </el-col>
       </el-row>
       <el-row>
		  <el-col :span="8">
			  <el-form-item label="计量单位" prop="calcType">
				<el-select v-model="createVehicleForm.calcType" style="width:272px;"  placeholder="请选择计量单位">
		  			<el-option
              v-for="item in optionscalcType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
		  </el-select>
			  </el-form-item>
		  </el-col>
       </el-row>
       <el-row>
		  <el-col :span="12">
           <el-form-item label="工具图片" prop="cardImg1" :rules="rules.cardImg1">
    	    <el-upload style="width:300px;" type="drag" :headers="{Accept:'application/json, text/plain, */*'}" :action="uploadUri" :http-request="upload1" :on-success="uploadSuccesssfz1"
    	      :on-remove="handleRemove" list-type="picture" :file-list="logoList">
    	      <el-button size="small" type="primary">点击上传</el-button>
    	      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    	    </el-upload>
			  </el-form-item>
		  </el-col>
       </el-row>
      <el-form-item label=" ">
        <el-button type="primary" @click="submitForm('createVehicleForm')">提交</el-button>
        <el-button @click="resetForm('createVehicleForm')">重置</el-button>
      </el-form-item>
		</el-form>
		
     <!-- <div class="camera_outer">
    <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
    <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
    <div v-if="imgSrc" class="img_bg_camera">
      <p>效果预览</p>
      <img :src="imgSrc" alt class="tx_img" />
    </div>
    <div class="button">
      <el-button @click="getCompetence()">打开摄像头</el-button>
      <el-button @click="stopNavigator()">关闭摄像头</el-button>
      <el-button @click="setImage()">拍照</el-button>
    </div>
  </div> -->
		  

	</div>
</template>
<script>
import { uploadUri } from 'utils'

import {addTool,uolad} from 'src/api/tool.js'
export default {
	name:'addTool',
	data() {
		return {
      videoWidth: 250,
      videoHeight: 350,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo:false,
      options: [{
          value: '手工工具',
          label: '手工工具'
        }, {
          value: '电动工具',
          label: '电动工具'
        }, {
          value: '大型设备',
          label: '大型设备'
        }, {
          value: '电力设备',
          label: '电力设备'
        }],
        optionscalcType: [{
          value: '件',
          label: '件'
        }, {
          value: '盒',
          label: '盒'
        }, {
          value: '包',
          label: '包'
        }, {
          value: '箱',
          label: '箱'
        },{
          value: '斤',
          label: '斤'
        }],
      createVehicleForm:{},
          rules:{name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
		 id: [
		  { required: true, message: '请输入ID', trigger: 'blur' }
    ],
    toolType: [
		  { required: true, message: '请选择工具类型', trigger: 'change' }
		],
    calcType: [
		  { required: true, message: '请选择计量单位', trigger: 'change' }
    ],
    cardImg1:[
      { required: false, message: '请上传工具图片',  }
    ]
      }
			
		}
  },
  computed: {
    uploadUri() {
      return uploadUri
    }
  },
  methods: {
    handleRemove(file, fileList) {
	  console.log(file)
	  console.log(fileList)
	  this.createVehicleForm.toolImg = ''
	},
    uploadSuccesssfz1(response, file) {
	  console.log(file)
	  if (response.success) {
	    this.createVehicleForm.toolImg = response.data.returnPath
	  }
	},
  upload1(res){
    const param1 = new FormData
    param1.append('file', res.file);
    uolad(param1).then(response =>{
      this.createVehicleForm.toolImg = response.data.data.returnPath
    })
  },
    submitForm(formName){
      console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.createVehicleForm.toolImg = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          addTool(this.createVehicleForm).then((res) =>{
          console.log(res)
          if(res.data.code!==200){
        this.listLoading = false
        this.$message.error(res.data.message,2)
        }else{
        this.$message.success('新增成功',2)
        // this.$router.go(-1)
        this.$router.push({path:'/gqjgl/index'})

        }
          })
        }else{
          console.log('error submit!!')
          return false;
        }

    })
    },
    resetForm(){

    },
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = 'block';
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {//不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            _this.thisVideo.play();
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  绘制图片（拍照功能）
	setImage() {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      _this.imgSrc = image;//赋值并预览图片
      // _this.stopNavigator()
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    }
    // base64转文件，此处没用到
    // dataURLtoFile(dataurl, filename) {
    //   var arr = dataurl.split(",");
    //   var mime = arr[0].match(/:(.*?);/)[1];
    //   var bstr = atob(arr[1]);
    //   var n = bstr.length;
    //   var u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new File([u8arr], filename, { type: mime });
    // }
  },
}
</script>