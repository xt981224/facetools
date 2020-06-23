<template>
  <div class="app-container">
    <div class="page-nav">
      <router-link v-handle="'roles:create'" to="createRole">
        <el-button type="info" v-waves icon="plus">新增角色</el-button>
      </router-link>
      <h3 class="nav-title">角色列表</h3>
    </div>

    <el-table
      v-loading="listLoading"
      element-loading-text="拼命加载中"
      :data="roleList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        align="center"
        prop="id"
        label="ID"
        width="80"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="角色名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="shortSpell"
        label="角色简拼"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="note"
        label="角色描述"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link
            v-handle="'roles:modify'"
            :to="{ path: 'modifyRole', query: { id: scope.row.id } }"
          >
            <el-button type="info" size="small">编辑</el-button>
          </router-link>
          <el-button
            v-handle="'roles:delete'"
            type="danger"
            size="small"
            @click.native="handleDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="!listLoading"
        :page-size="listQuery.size"
        :page-sizes="[10, 20, 30]"
        :current-page.sync="listQuery.current"
        :total="total"
        @size-change="handleSizeUpdate"
        @current-change="handleCurrentUpdate"
        layout="total,sizes,prev,pager,next,jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchList, deleteRole } from "api/roles";

export default {
  name: "roles",
  data() {
    return {
      roleList: null,
      listLoading: true,
      total: null,
      pages: null,
      listQuery: {
        current: 1,
        size: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const data = this.listQuery;
      fetchList(data)
        .then((response) => {
          const resData = response.data;
          if (resData.success) {
            const listData = resData.data;
            this.roleList = listData.records;
            this.total = listData.total;
            this.pages = listData.pages;
            this.listLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDel(id) {
      deleteRole({ permRoleIds: [id] })
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
    handleSizeUpdate(val) {
      this.listQuery.size = val;
      this.getList();
    },
    handleCurrentUpdate(val) {
      this.listQuery.current = val;
      this.getList();
    },
  },
};
</script>

<style lang="less"></style>
