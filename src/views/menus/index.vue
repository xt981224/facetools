<template>
  <div class="app-container">
    <div class="page-nav clearfix">
      <router-link v-handle="'menus:create'" to="createMenu">
        <el-button type="info" icon="plus">新增菜单</el-button>
      </router-link>
      <h3 class="nav-title">菜单列表</h3>
    </div>
    <el-table
      v-loading="listLoading"
      element-loading-text="拼命加载中"
      :data="reMenusList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-tree-column
        fixed
        align="center"
        prop="name"
        label="菜单名称"
      ></el-table-tree-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? "目录" : "" }}
          {{ scope.row.type === 2 ? "菜单" : "" }}
          {{ scope.row.type === 3 ? "按钮" : "" }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="parentName"
        label="上级菜单"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="url"
        label="菜单url"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="code"
        label="code"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link
            v-handle="'menus:modify'"
            :to="{ path: 'modifyMenu', query: { id: scope.row.id } }"
          >
            <el-button type="info" size="small">编辑</el-button>
          </router-link>
          <el-button
            v-handle="'menus:delete'"
            type="danger"
            size="small"
            @click.native="handleDel(scope.row.id, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, deleteMenu } from "api/menus";
import { formatListTree } from "utils";

export default {
  name: "menus",
  data() {
    return {
      menusList: [],
      listLoading: true,
      menuIds: [],
    };
  },
  created() {
    this.getList();
  },
  computed: {
    reMenusList() {
      const targetList = this.menusList;
      return formatListTree(targetList);
    },
  },
  methods: {
    getList() {
      fetchList()
        .then((response) => {
          const resData = response.data;
          if (resData.success) {
            this.menusList = resData.listData;
            this.listLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDel(id, row) {
      if (row.children && row.children.length > 0) {
        this.$message({
          message: "请先删除子菜单！",
          type: "warning",
        });
        return false;
      }
      deleteMenu({ menuIds: [id] })
        .then((response) => {
          const resData = response.data;
          if (resData.success) {
            this.$message({
              message: "删除成功！",
              type: "success",
            });
            this.getList();
          } else {
            this.$message.error(resData.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
