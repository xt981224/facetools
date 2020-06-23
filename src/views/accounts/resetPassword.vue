<template>
  <div class="app-container">
    <el-form ref="resetForm" :model="resetForm" :rules="rules" label-width="80px">
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="resetForm.newPassword" style="width:300px;" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="Password2">
        <el-input type="password" v-model="resetForm.Password2" style="width:300px;" placeholder="请确认输入密码"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="submitForm('resetForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { resetPassword } from 'api/accounts'

export default {
  name: 'resetPassword',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        id: this.$route.query.id,
        newPassword: '',
        Password2: ''
      }, rules: {
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        Password2: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          resetPassword(this.resetForm).then(response => {
            const resData = response.data
            if (resData.success) {
              this.$message({
                message: '密码重置成功！',
                type: 'success'
              })
              this.$router.go(-1)
            } else {
              this.$message.error(resData.message)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    }
  }
}
</script>

