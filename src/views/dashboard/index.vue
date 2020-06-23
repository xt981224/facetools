<template>
  <div class="dashboard-container">
    <component v-bind:is="currentRole"></component>
  </div>
</template>

<script>
import DefaultDashboard from './default'

export default {
  name: 'dashboard',
  components: { DefaultDashboard },
  data() {
    return {
      currentRole: 'DefaultDashboard'
    }
  }
}
</script>

<style lang="less">

</style>

