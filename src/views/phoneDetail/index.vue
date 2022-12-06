<template>
  <div class="detail">
    <div class="scene-title">
      <img
        :src="require('@/assets/1.png')"
        alt=""
        class="scene-icon"
      />
      <h2>手机检测</h2>
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      type="border-card"
    >
      <el-tab-pane
        label="训练"
        name="first"
        class="tab-pannel"
      >
        <Train></Train>
      </el-tab-pane>
      <el-tab-pane
        label="推理"
        name="second"
        class="tab-pannel"
      >
        <Reasoning></Reasoning>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Train from './train/train.vue'
import Reasoning from './reasoning/reasoning.vue'

export default {
  name: 'detail-cv',
  components: {
    Train,
    Reasoning
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding-left: 10px;
  min-height: 600px;
}
.scene-title {
  display: flex;
  margin-bottom: 20px;
  .scene-icon {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
}

.tab-pannel {
  height: 100%;
}

/deep/ .el-tabs__item {
  font-size: 18px !important;
}

/deep/ .el-tabs__content {
  min-height: 700px;
}
</style>