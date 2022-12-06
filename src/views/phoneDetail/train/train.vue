<template>
  <div class="train-box">
    <div class="file-box">
      <span class="file-lable">请选择数据集</span>
      <el-select
        v-model="dataval"
        class="file-input"
        placeholder="请选择数据集"
      >
        <el-option
          v-for="item in datasets"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        @click="startTrain"
        class="start-btn"
      >
        开始训练
      </el-button>
      <div
        class="file-tag"
        v-if="hasFile"
      >
        <span class="el-tag el-tag--info el-tag--small el-tag--light">
          <span class="el-select__tags-text">{{ fileName }}</span>
          <i
            class="el-tag__close el-icon-close"
            @click="delFile"
          ></i>
        </span>
      </div>
    </div>
    <div
      v-if="dataval"
      class="dataset-info"
    >
      {{ datainfo[dataval] }}
    </div>
    <!-- 隐藏的文件选择 -->
    <input
      ref="file"
      type="file"
      style="display: none"
      accept=".rar, .zip, .7z"
      @change="uploadData"
    />
    <!-- 高级模式 -->
    <el-collapse
      v-model="activeNames"
      @change="handleChange"
      class="high-model"
    >
      <el-collapse-item
        title="高级模式"
        name="1"
      >
        <el-form
          ref="form"
          :model="sizeForm"
          label-position="right"
          label-width="150px"
          class="form-inline"
        >
          <div class="inline">
            <el-form-item label="总的Epoch数量">
              <el-input
                v-model="sizeForm.epoch"
                placeholder="请输入总的Epoch数量"
              ></el-input>
            </el-form-item>
            <el-form-item label="非极大值抑制域值">
              <el-input
                v-model="sizeForm.max"
                placeholder="请输入非极大值抑制域值"
              ></el-input>
            </el-form-item>
          </div>
          <div class="inline">
            <el-form-item label="使用GPU数量">
              <el-input
                v-model="sizeForm.cpu"
                placeholder="请输入使用GPU数量"
              ></el-input>
            </el-form-item>
            <el-form-item label="优化器">
              <el-select
                v-model="sizeForm.youhua"
                placeholder="请选择优化器"
              >
                <el-option
                  v-for="item in youhua"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="inline">
            <el-form-item label="学习率衰减策略">
              <el-select
                v-model="sizeForm.rute"
                placeholder="请选择学习率衰减策略"
              >
                <el-option
                  v-for="item in studyRute"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="初始学习率">
              <el-input
                v-model="sizeForm.init"
                placeholder="请输入初始学习率"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!-- 开始训练 -->
    <!-- <div class="start">
      <el-button
        type="primary"
        @click="startTrain"
        class="start-btn"
      >
        开始训练
      </el-button>
    </div> -->
    <!-- 进度条 -->
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
    <!-- 日志输出框 -->
    <div v-show="timer">
      <span class="log-title">日志输出：</span>
      <div
        class="log-box"
        id="logBox"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { fileToBlob } from '../../../utils/index'

export default {
  name: 'train-cv',
  data() {
    return {
      dataval: '',
      activeNames: [''],
      datasets: ['phone'],
      datainfo: {
        phone:
          '本数据集是办公场景下的手机检测数据集，共标注有969张图片， 图片采用labelimg标注。'
      },
      sizeForm: {
        epoch: '',
        max: '',
        cpu: '',
        youhua: '',
        rute: '',
        init: ''
      },
      youhua: [
        {
          value: 'Sad',
          label: 'Sad'
        },
        {
          value: 'Adam',
          label: 'Adam'
        },
        {
          value: 'Adagrad',
          label: 'Adagrad'
        }
      ],
      studyRute: [
        {
          value: 'Step_LR',
          label: 'Step_LR'
        },
        {
          value: 'Cosine_decay',
          label: 'Cosine_decay'
        },
        {
          value: 'Exponential_decay',
          label: 'Exponential_decay'
        }
      ],
      value: '',
      placeFile: '请上传数据集',
      fileName: '',
      progressValue: 0,
      timer: null
    }
  },
  computed: {
    hasFile() {
      return this.fileName !== ''
    }
  },
  async created() {
    // const res = await this.$axios.get('/dataset')
    // console.log('res----', res.data.data)
    this.datasets = ['phone']
  },
  methods: {
    selectFile() {
      console.log('选择文件')
      this.$refs.file.click()
    },
    delFile() {
      this.fileName = ''
      this.placeFile = '请上传数据集'
    },
    handleChange(val) {
      console.log(val)
    },
    onSubmit() {
      console.log('submit!')
    },
    startTrain() {
      console.log('开始训练')
      if (!this.progressValue) {
        this.timer = setInterval(() => {
          let progressValue = this.progressValue + 0.01
          this.progressValue = +progressValue.toFixed(2)
          if (this.progressValue >= 100) {
            clearInterval(this.timer)
          }
        }, 1000)
      }
      this.readLog()
    },
    uploadData(e) {
      // var e = window.event || e // change事件获取到的数据
      if (e.target.files[0].size > 500 * 1024 * 1024) {
        // 限制文件上传大小
        console.log('文件上传不能大于500M')
      } else {
        if (e.target.files.length > 0) {
          this.placeFile = ''
          this.progressValue = 0
          this.timer = null
          console.log('得到的文件是----', e.target.files)
          this.fileName = e.target.files[0].name
        }
      }
    },
    async readLog() {
      const logBox = document.getElementById('logBox')
      console.log('开始读取日志内容--', logBox)
      const res = await fileToBlob('./train.txt')
      const logList = res.split('\n')
      for (let index = 0; index < logList.length; index++) {
        // 滚动到盒子底部
        if (logBox.scrollHeight > logBox.clientHeight) {
          setTimeout(() => {
            logBox.scrollTop = logBox.scrollHeight
          }, 0)
        }
        const logStr = await this.sleepFun(logList[index])
        const subDiv = document.createElement('div')
        subDiv.innerText = logStr
        logBox.append(subDiv)
      }
    },
    sleepFun(logStr) {
      return new Promise((res) => {
        return setTimeout(() => {
          res(logStr)
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.train-box {
  width: 90%;
  /deep/ .el-input-group__append {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  /deep/ .el-input-group__append:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .file-box {
    position: relative;
    display: flex;
    align-items: center;
    .file-lable {
      font-size: 16px;
      margin-right: 10px;
      min-width: 100px;
    }
  }
  .file-tag {
    position: absolute;
    top: 8px;
    left: 8px;
  }
  .file-input {
    // cursor: pointer;
    width: 80%;
    margin-right: 10px;
  }

  .dataset-info {
    padding: 10px;
    height: 60px;
    margin-top: 5px;
    margin-right: 10px;
    color: #a0a0a0;
    border: 1px solid #bbb;
  }

  /deep/ .el-input__inner {
    cursor: pointer;
  }
  .start {
    margin: 20px 0;
    float: right;
    .start-btn {
      background-color: #409eff;
      border-color: #409eff;
    }
    .start-btn:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
  }
  .high-model {
    margin-top: 20px;
    border-top: none;
    /deep/ .el-collapse-item__header {
      font-size: 16px;
    }
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
  }

  .progress {
    margin: 15px 0px 6px 0px;
  }

  .log-title {
    display: block;
    font-size: 16px;
    margin: 15px 0px 6px 0px;
  }

  .log-box {
    width: 100%;
    height: 500px;
    color: #fff;
    padding: 10px;
    overflow-y: hidden;
    border-radius: 5px;
    background-color: #000;
  }
  .log-box::-webkit-scrollbar-thumb {
    border-radius: 0px;
  }
  .log-box::-webkit-scrollbar-track {
    border-radius: unset;
    background: #000;
  }
}
</style>