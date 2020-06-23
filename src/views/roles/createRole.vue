<template>
  <div class="app-container">
    <el-form ref="addRoleForm" :model="addRoleForm" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="addRoleForm.name" style="width:300px;" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="角色简拼" prop="shortSpell">
        <el-input v-model="addRoleForm.shortSpell" style="width:300px;" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="note">
        <el-input type="textarea" v-model="addRoleForm.note" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="授权菜单" prop="menuIds">
        <el-tree :data="menusAuthority" show-checkbox node-key="id" :props="menusProps" @check-change="handleCheckChange" style="width:300px;"
          ref="menusTree"></el-tree>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="submitForm('addRoleForm')">提交</el-button>
        <el-button @click="resetForm('addRoleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addRole, fetchInfo } from 'api/roles'
import { fetchList, fetchRoleMenu } from 'api/menus'
import { formatTree } from 'utils'

export default {
  name: 'addRole',
  data() {
    return {
      menusAuthority: [],
      menusProps: {
        id: 'id',
        label: 'label',
        children: 'children'
      },
      addRoleForm: {
        id: this.$route.query.id,
        name: '',
        shortSpell: '',
        note: '',
        menuIds: []
      }, rules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        shortSpell: [
          { required: true, message: '请输入角色简拼', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const permRoleId = this.addRoleForm.id
    this.initMenus(permRoleId)
    this.bindInfoForm(permRoleId)
  },
  methods: {
    bindInfoForm(permRoleId) {
      if (permRoleId) {
        fetchInfo({ permRoleId }).then(response => {
          const resData = response.data
          if (resData.success) {
            this.addRoleForm = resData.data
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    initMenus(permRoleId) {
      fetchList().then(response => {
        const resData = response.data
        if (resData.success) {
          this.menusAuthority = formatTree(resData.listData)
        }
      }).catch(err => {
        console.log(err)
      })

      if (permRoleId) {
        fetchRoleMenu({ permRoleId }).then(response => {
          const resData = response.data
          if (resData.success) {
            for (const item of resData.listData) {
              this.addRoleForm.menuIds.push(item.id)
            }
            this.$refs.menusTree.setCheckedKeys(this.addRoleForm.menuIds)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addRole(this.addRoleForm).then(response => {
            const resData = response.data
            if (resData.success) {
              this.$message({
                message: '添加成功！',
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
    },
    handleCheckChange(data, checked, indeterminate) {
      this.addRoleForm.menuIds = this.$refs.menusTree.getCheckedKeys()
      console.log(indeterminate)
    }
  }
}
</script>

<style lang="less">

</style>

