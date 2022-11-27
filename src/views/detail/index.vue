<template>
  <div>
    <div class="scene-title">
      <img :src="require('@/assets/1.png')" alt="" class="scene-icon" />
      <h2>训练页面</h2>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="训练" name="first">
        <Train></Train>
      </el-tab-pane>
      <el-tab-pane label="推理" name="second">
        <Reasoning></Reasoning>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Train from "./train/train.vue"
import Reasoning from "./reasoning/reasoning.vue"

export default {
  name: "Detail",
  components: {
    Train,
    Reasoning
  },
  data () {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.scene-title {
  display: flex;
  margin-bottom: 20px;
  .scene-icon {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
}

/deep/ .el-tabs__item {
  font-size: 18px !important;
}

/deep/ .el-tabs__content {
  height: calc(100vh - 300px);
}
</style>