<template>
  <div class="dashboard-editor-container">
    <div class="clearfix">
      <user-thumb style="float: left" :image="avatar">
        你的权限：<br>
        <span class="user-info-roles" v-for="(item,index) in roles" :key="index">{{item}}</span>
      </user-thumb>
      <div class="info-container">
        <span class="display_name">{{name}}</span>
        <span class="general-desc" v-for="(item,index) in roles" :key="index">{{item}}</span>
      </div>
    </div>
    <div>
      <img :src="emptyGif" class="emptyGif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userThumb from 'components/userThumb'

export default {
  name: 'dashboardDefault',
  components: { userThumb },
  data() {
    return {
      emptyGif: '../static/empty.gif'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'avatar',
      'email',
      'uid',
      'introduction',
      'codes'
    ])
  }
}
</script>

<style lang="less">
.general-desc {
  font-size: 20px;
  padding-top: 20px;
  display: inline-block;
}

.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}

.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  margin-top: -50px;
  padding: 100px 60px 0px;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}
</style>

