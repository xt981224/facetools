<template>
  <el-menu mode="vertical" theme="dark" :default-active="$route.path">
    <sidebar-item :routes="sideRouters"></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SideBarItem.vue";
export default {
  name: "SideBar",
  components: { SidebarItem },
  computed: {
    ...mapGetters({
      sideRouters: "permission_routers",
    }),
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  min-height: 100%;
}
</style>
