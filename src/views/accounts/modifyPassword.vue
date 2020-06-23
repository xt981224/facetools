<template>
  <div class="app-container">
    <el-form ref="modifyForm" :model="modifyForm" :rules="rules" label-width="140px">
      <el-form-item label="旧密码" prop="password">
        <el-input type="password" v-model="modifyForm.oldPassword" style="width:300px;" placeholder="旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password2">
        <el-input type="password" v-model="modifyForm.newPassword" style="width:300px;" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="password2">
        <el-input type="password" v-model="modifyForm.newPassword2" style="width:300px;" placeholder="确认新密码"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="submitForm('modifyForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { modifyPassword } from 'api/accounts'

export default {
  name: 'modifyPassword',
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
      } else if (value !== this.modifyForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      modifyForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      }, rules: {
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.modifyForm.newPassword2
          modifyPassword(this.modifyForm).then(response => {
            const resData = response.data
            if (resData.success) {
              this.$message({
                message: '密码修改成功！',
                type: 'success'
              })
              setTimeout(() => {
                this.$store.dispatch('LogOut').then(() => {
                  location.reload()
                })
              }, 1000)
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

