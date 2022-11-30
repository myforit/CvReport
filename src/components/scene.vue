<template>
  <div class="scene">
    <div
      v-for="(item, index) in sceneList"
      :key="index"
    >
      <div class="scene-title">
        <img
          :src="item.icon"
          alt=""
          class="scene-icon"
        />
        <h2>{{ item.title }}</h2>
      </div>
      <div class="scene-body">
        <div
          v-for="(check, i) in item.checks"
          :key="i"
          class="check"
        >
          <!-- <Pannel :checkItme="check"></Pannel> -->
          <PannelNice :checkItme="check"></PannelNice>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Pannel from './pannel.vue'
import PannelNice from './pannelNice.vue'

export default {
  name: 'scene-cv',
  components: {
    // Pannel,
    PannelNice
  },
  props: {
    sceneList: {
      type: Array,
      default: () => [
        {
          title: '工况场景',
          icon: require('@/assets/1.png'),
          checks: []
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.scene {
  padding-left: 10px;
  .scene-title {
    display: flex;
    margin-bottom: 20px;
    .scene-icon {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
  .scene-body {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    margin-left: -10px;
    .check {
      box-sizing: border-box;
      width: 33.33%;
      // height: 260px;
      margin-bottom: 30px;
    }
  }
}
</style>