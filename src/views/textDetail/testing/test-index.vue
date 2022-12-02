<template>
  <div class="test-box">
    <div class="form-box">
      <el-form
        ref="form"
        :model="sizeForm"
        label-position="right"
        label-width="150px"
        class="form-inline"
      >
        <div class="inline">
          <el-form-item label="任务名称">
            <el-select
              v-model="sizeForm.youhua"
              placeholder="请选择任务名称"
            >
              <el-option
                v-for="item in taskNames"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版本号">
            <el-select
              v-model="sizeForm.youhua"
              placeholder="请选择版本号"
            >
              <el-option
                v-for="item in versions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="inline">
          <el-form-item label="训练用的Epoch">
            <el-select
              v-model="sizeForm.youhua"
              placeholder="请选择Epoch"
            >
              <el-option
                v-for="item in epochs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用最佳Epoch">
            <el-checkbox v-model="sizeForm.usePre"></el-checkbox>
          </el-form-item>
        </div>
        <div class="inline">
          <el-form-item label="使用GPU数量">
            <el-select
              v-model="sizeForm.youhua"
              placeholder="请选择GPU数量"
            >
              <el-option
                v-for="item in gpus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="start-btn">
          <el-button
            type="primary"
            @click="startTest"
          >开始测试</el-button>
        </div>
      </el-form>
    </div>
    <div
      class="progress"
      v-if="timer"
    >
      <span class="log-title">训练进度：</span>
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        text-color="white"
        :percentage="progressValue"
      ></el-progress>
    </div>
    <div class="result">
      <span class="log-title">测试结果：</span>
      <div class="result-box">
        <div>char_recall(召回率)：0.9417</div>
        <div>char_precision(查准)：0.9304</div>
        <div>word_acc(全匹配模式):0.7134</div>
        <div>word_acc_ignore_case(忽略大小写的匹配模式):0.7134</div>
        <div>word_acc_ignore_case_symbol(忽略大小写及符号的匹配模式):0.7325</div>
      </div>
    </div>
    <div class="img-list">
      <span class="log-title">图例：</span>
      <div class="img-split">
        <div class="img-left">
          <span class="log-title">Good Case</span>
          <div class="img-box">
            <img
              v-for="(item, index) in goodImgs"
              :key="index"
              :src="item.img"
              alt=""
              class="img-item"
            >
          </div>
        </div>
        <div class="img-right">
          <span class="log-title">Bad Case</span>
          <div class="img-box"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-index',
  data() {
    return {
      sizeForm: {
        usePre: '',
        dataSplit: '训练集',
        epoch: '100',
        max: '',
        cpu: '2',
        youhua: '',
        rute: '',
        init: ''
      },
      taskNames: [''],
      versions: [''],
      epochs: [''],
      gpus: [''],
      timer: '',
      progressValue: 0,
      goodImgs: []
    }
  },
  created() {
    const imgList = require.context('../../../assets/goodcase', true, /.*/)
    const goodImgs = imgList.keys().map((item) => {
      // console.log('item-----', item.substr(1))
      return { img: require('../../../assets/goodcase' + item.substr(1)) }
    })
    console.log('goodImgs-----', goodImgs)
    this.goodImgs = goodImgs
  },
  methods: {
    startTest() {
      console.log('开始测试')
      if (!this.progressValue) {
        this.timer = setInterval(() => {
          let progressValue = this.progressValue + 0.01
          this.progressValue = +progressValue.toFixed(2)
          if (this.progressValue >= 100) {
            clearInterval(this.timer)
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.test-box {
  .form-inline {
    margin-left: -40px;
    margin-top: 20px;
    .inline {
      display: flex;
      justify-content: flex-start;
      /deep/ .el-form-item {
        width: 460px;
      }
      .el-select {
        width: 100%;
      }
    }
  }
  .start-btn {
    text-align: center;
  }
  .progress {
    margin: 15px 0px 6px 0px;
  }

  .log-title {
    display: block;
    font-size: 16px;
    margin: 15px 0px 6px 0px;
  }

  .result-box {
    color: #fff;
    padding: 10px;
    background-color: #000;
  }

  .img-split {
    display: flex;
    justify-content: space-between;
    .img-left,
    .img-right {
      width: 48%;
    }
    .img-box {
      overflow-y: auto;
      height: 500px;
      border: 2px solid #000;
      padding: 10px;
      .img-item {
        width: 100%;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        box-shadow: 0 0 5px #ccc;
      }
      // .img-item:hover {
      //   box-shadow: 0 0 5px #ccc;
      // }
    }
  }
}
</style>