<template>
  <div class="app-container">
    <el-form ref="modifyForm" :model="modifyForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="modifyForm.username" :disabled="true" style="width:300px;" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="modifyForm.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input type="number" v-model="modifyForm.mobile" style="width:300px;" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="modifyForm.email" style="width:300px;" placeholder="请输入邮箱地址"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="modifyForm.realName" style="width:300px;" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户角色" prop="roleIds">
        <el-checkbox-group v-model="modifyForm.roleIds">
          <el-checkbox v-for="item in roleData" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="submitForm('modifyForm')">提交</el-button>
        <el-button @click="resetForm('modifyForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { formatSelect } from 'utils'
import { isEmail, isMobile } from 'utils/validate'
import { fetchAllRoles, fetchUserRole } from 'api/roles'
import { fetchInfo, modifyPermUser } from 'api/accounts'

export default {
  name: 'modifyAccount',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    }
    const validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error('手机号码格式不正确'));
      } else {
        callback();
      }
    }
    return {
      roleData: [],
      modifyForm: {
        id: this.$route.query.id,
        username: '',
        gender: '',
        mobile: '',
        email: '',
        realName: '',
        roleIds: []
      }, rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const permUserId = this.modifyForm.id
    this.initRole(permUserId)
    this.initUserInfo(permUserId)
  },
  methods: {
    initRole(permUserId) {
      fetchAllRoles().then(response => {
        const resData = response.data
        if (resData.success) {
          this.roleData = formatSelect(resData.listData)
          if (permUserId) {
            fetchUserRole({ permUserId }).then(response2 => {
              const resData2 = response2.data
              if (resData2.success && resData2.listData) {
                this.roleIds = resData2.listData[0].id
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    initUserInfo(permUserId) {
      fetchInfo({ permUserId }).then(response => {
        const resData = response.data
        if (resData.success) {
          this.modifyForm = resData.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          modifyPermUser(this.modifyForm).then(response => {
            const resData = response.data
            if (resData.success) {
              this.$message({
                message: '修改成功！',
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">

</style>

