<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <side-bar class="sidebar-container" />
    </div>
    <div class="main-container">
      <nav-bar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { NavBar, SideBar, AppMain } from 'views/layout'
export default {
  name: 'layout',
  components: {
    NavBar,
    SideBar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style lang="less" scoped>
@import "~styles/mixin.less";

.app-wrapper {
  .clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.hideSidebar {
    .sidebar-wrapper {
      transform: translate(-140px, 0);
      .sidebar-container {
        transform: translate(132px, 0);
      }
      &:hover {
        transform: translate(0, 0);
        .sidebar-container {
          transform: translate(0, 0);
        }
      }
    }
    .main-container {
      margin-left: 40px;
    }
  }
  .sidebar-wrapper {
    width: 180px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    overflow-x: hidden;
    transition: all .28s ease-out;
    .scrollBar;
  }
  .sidebar-container {
    transition: all .28s ease-out;
  }
  .main-container {
    min-height: 100%;
    transition: all .28s ease-out;
    margin-left: 180px;
  }
}
</style>
