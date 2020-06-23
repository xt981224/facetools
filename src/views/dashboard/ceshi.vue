<!--
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-12 12:46:36
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-17 20:55:00
--> 
<template>
  <div class="app-container">
   <el-button @click="resetForm">重置</el-button>
  </div>
</template>

<script>
// import { bindCarrierWx } from 'api/drivers.js'
export default {
  name: 'createShipper',
  data() {
    return {
    }
  },
  methods: {
    resetForm(){
      // bindCarrierWx().then(res =>{
      //   console.log(res.data)
      // })
      console.log('aa')
    }
  }
}
</script>
