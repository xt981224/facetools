<template>
  <div class="app-container">
    <el-form ref="addMenuForm" :model="addMenuForm" :rules="rules" label-width="80px">
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="addMenuForm.type" @change="typeChange">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="addMenuForm.name" style="width:300px;" placeholder="菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid">
        <tree-select :treeData="treeMenus" :treeProps="treeProps" v-model="addMenuForm.pid" style="width:300px;" :multiple="false"
          placeholder="请选择上级菜单" @setSelectedId="handleMenuChange">
        </tree-select>
      </el-form-item>
      <el-form-item label="菜单简拼" prop="shortSpell">
        <el-input v-model="addMenuForm.shortSpell" style="width:300px;" placeholder="菜单简拼"></el-input>
      </el-form-item>
      <el-form-item label="CODE" prop="code" :class="[showMenu || showButton ? '' : none]">
        <el-input v-model="addMenuForm.code" style="width:300px;" placeholder="code"></el-input>
      </el-form-item>
      <el-form-item label="URL" prop="url" :class="[showMenu || showButton ? '' : none]">
        <el-input v-model="addMenuForm.url" style="width:300px;" placeholder="菜单URL"></el-input>
      </el-form-item>
      <el-form-item label="授权标识" prop="permRule" :class="[showMenu || showButton ? '': none]">
        <el-input v-model="addMenuForm.permRule" style="width:300px;" placeholder="多个用逗号分隔，如：user:list,user:create"></el-input>
      </el-form-item>
      <el-form-item label="排序号" prop="listOrder" :class="[showMenu ? '' : none]">
        <el-input v-model="addMenuForm.listOrder" style="width:300px;" placeholder="排序号"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon" :class="[showMenu || showCatalog ? '' : none]">
        <el-input v-model="addMenuForm.icon" style="width:300px;" placeholder="菜单图标"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="submitForm('addMenuForm')">提交</el-button>
        <el-button @click="resetForm('addMenuForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import treeSelect from 'components/tree-select/tree.vue'
import { addMenu, fetchList, fetchInfo } from 'api/menus'
import { formatTree } from 'utils'

export default {
  name: 'addMenu',
  components: { treeSelect },
  data() {
    return {
      none: 'none',
      showButton: false,
      showMenu: true,
      showCatalog: false,
      treeMenus: [],
      treeProps: {
        label: 'label',
        children: 'children',
        level: 'level'
      },
      addMenuForm: {
        id: this.$route.query.id,
        name: '',
        shortSpell: '',
        url: '',
        type: 2,
        permRule: '',
        code: '',
        pid: 0,
        listOrder: 0,
        icon: ''
      }, rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        shortSpell: [
          { required: true, message: '请输入菜单简拼', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const permMenuId = this.addMenuForm.id
    this.initMenus(permMenuId)
  },
  methods: {
    initMenus(permMenuId) {
      fetchList().then(response => {
        const resData = response.data
        if (resData.success) {
          this.treeMenus = formatTree(resData.listData)
          if (permMenuId) {
            fetchInfo({ permMenuId }).then(response => {
              const resData = response.data
              if (resData.success) {
                console.log(resData.data)
                this.addMenuForm = resData.data
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addMenu(this.addMenuForm).then(response => {
            const resData = response.data
            if (resData.success) {
              this.$message({
                message: '提交成功！',
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
    handleMenuChange(value) {
      this.addMenuForm.pid = value
    },
    typeChange(value) {
      switch (value) {
        case 1:
          this.showMenu = false
          this.showButton = false
          this.showCatalog = true
          break
        case 2:
          this.showMenu = true
          this.showButton = false
          this.showCatalog = false
          break
        case 3:
          this.showMenu = false
          this.showButton = true
          this.showCatalog = false
          break
        default:
      }
    }
  }
}
</script>

<style lang="less">

</style>
