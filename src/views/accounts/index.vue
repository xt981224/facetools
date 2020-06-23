<template>
  <div class="app-container">
    <div class="page-nav">
      <router-link v-handle="'accounts:create'" to="createAccount">
        <el-button type="info" v-waves icon="plus">新增员工账号</el-button>
      </router-link>
      <h3 class="nav-title">员工列表</h3>
    </div>

    <el-table
      v-loading="listLoading"
      element-loading-text="拼命加载中"
      :data="userList"
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
        prop="username"
        label="账号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="realName"
        label="真实姓名"
      ></el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          {{ scope.row.gender === 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="mobile"
        label="手机号码"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="email"
        label="邮箱"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link
            v-handle="'accounts:modify'"
            :to="{ path: 'modifyAccount', query: { id: scope.row.id } }"
          >
            <el-button type="info" size="small">编辑</el-button>
          </router-link>
          <router-link
            v-handle="'accounts:resetPassword'"
            :to="{ path: 'resetPassword', query: { id: scope.row.id } }"
          >
            <el-button :plain="true" type="info" size="small"
              >重置密码</el-button
            >
          </router-link>
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
import { fetchList } from "api/accounts";
export default {
  name: "accounts",
  data() {
    return {
      listQuery: {
        current: 1,
        size: 10,
      },
      total: null,
      pages: 10,
      listLoading: true,
      userList: null,
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
            this.userList = listData.records;
            this.total = listData.total;
            this.pages = listData.pages;
            this.listQuery.current = listData.current;
            this.listQuery.size = listData.size;
          }
          this.listLoading = false;
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
