<template>
  <div class="train-box">
    <div class="file-box">
      <div class="file-inline">
        <span class="file-lable">请输入任务名称</span>
        <el-input
          v-model="sizeForm.taskName"
          placeholder="请输入任务名称"
        ></el-input>
        <span class="version-lable">版本号</span>
        <el-input
          v-model="sizeForm.version"
          placeholder="请输入版本号"
        ></el-input>
      </div>
      <div class="dataset">
        <div class="file-dataset">
          <span class="file-lable">请选择数据集</span>
          <div class="file-input">
            <el-select
              v-model="dataset"
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
            <div
              v-if="dataset"
              class="dataset-info"
            >
              {{ datasetInfo[dataset] }}
            </div>
          </div>
        </div>
        <!-- 隐藏的文件选择 -->
        <input
          ref="file"
          type="file"
          style="display: none"
          accept=".rar, .zip, .7z"
          @change="uploadData"
        />
      </div>
      <div class="modules">
        <div class="file-modules">
          <span class="file-lable">请选择模型</span>
          <div class="file-input">
            <el-select
              v-model="moduleVal"
              class="file-input"
              placeholder="请选择模型"
            >
              <el-option
                v-for="item in moduleArray"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <div
              v-if="moduleVal"
              class="dataset-info"
            >
              {{moduleInfo[moduleVal]}}
            </div>
          </div>
        </div>
        <!-- 隐藏的文件选择 -->
        <input
          ref="file"
          type="file"
          style="display: none"
          accept=".rar, .zip, .7z"
          @change="uploadData"
        />
      </div>
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
            <el-form-item label="使用预训练权重">
              <el-checkbox v-model="sizeForm.usePre"></el-checkbox>
            </el-form-item>
            <el-form-item label="数据集分割比例">
              <el-input
                v-model="sizeForm.dataSplit"
                placeholder="请输入非极大值抑制域值"
              ></el-input>
            </el-form-item>
          </div>
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
    <div class="start">
      <el-button
        type="primary"
        @click="startTrain"
        class="start-btn"
      >
        开始训练
      </el-button>
    </div>
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
        @mousewheel="scrollChange"
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
      activeNames: [''],
      dataset: '',
      datasets: ['ICDAR 2017 RCTW', 'ICDAR 2013', 'Total-Text', 'SCUT-CTW1500'],
      datasetInfo: {
        'ICDAR 2017 RCTW':
          '该数据集由Baoguang Shi等学者提出。主要是中文，共12263张图像，其中8034作为训练集，4229作为测试集。使用文本级别标注。数据集绝大多数是相机拍的自然场景，一些是屏幕截图；包含了大多数场景，如室外街道、室内场景、手机截图等等',
        'ICDAR 2013':
          '该数据集是OCR流程常用的benchmark，包含文字目标检测的标注及OCR识别的标注结果，其中对于文本检测任务采用水平框标注，主要是英文，文本识别部分采用单词级标注。',
        'Total-Text':
          '该数据集是一个OCR数据集，由 1,555 张图像组成，涵盖超过三种不同的文本方向（水平、多方向和弯曲），可用于解决任意形状文本识别相关问题。其中，训练集包含 1,255 张图像，测试集包含 300 张图像',
        'SCUT-CTW1500':
          '该数据集是一个可用于识别场景中弧形文字的数据集。该数据集包括：1500 张图像（训练集 1000 张，测试集 500 张），10751 张裁剪过的包含文本的图像，其中 3,530 张图像中包含弧形不规则文本，其中大量图像中的文本是横向或方向各异的。'
      },
      moduleVal: '',
      moduleArray: ['CRNN', 'SAR', 'MASTER'],
      moduleInfo: {
        CRNN: 'CRNN是主流的文本识别模型，可识别较长的文本序列，它利用BLSTM和CTC部件学习字符图像中的上下文关系，从而有效提升了文本识别准确率。其中模型中CNN将图像特征提取出来后采用RNN对序列进行预测，最后通过一个CTC翻译层得到最终结果。',
        SAR: 'SAR是一种利用二维特征映射实现更稳健解码的代表性方法，特别是主要针对撞击不规则文本提出了一种新的方法。一方面，SAR在CNN编码器中采用了更强大的残差块来学习更强的图像表示。另一方面，SAR采用二维关注特征图的空间维度进行解码，在弯曲和倾斜文本中具有更强的性能。',
        MASTER:
          'MASTER是一种在文本识别中引入全局注意力机制的网络，有效解决了基于局部注意力机制方法的注意力问题，以此来提高模型性能和缓解注意力混淆问题。其中编码器采用基于Muti-Aspect的全局上下文注意力机制的编码器，解码器采用Transformer解码。'
      },
      sizeForm: {
        taskName: '',
        version: '',
        usePre: '',
        dataSplit: '训练集',
        epoch: '100',
        max: '',
        cpu: '2',
        youhua: '',
        rute: '',
        init: ''
      },
      youhua: [
        {
          value: 'SGD',
          label: 'SGD'
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
      timer: null,
      startScroll: true
    }
  },
  computed: {
    hasFile() {
      return this.fileName !== ''
    }
  },
  // async created() {
  //   const res = await this.$axios.get('/dataset')
  //   console.log('res----', res.data.data)
  //   this.datasets = res.data.data
  // },
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
    startTrain(e) {
      console.log('开始训练')
      let target = e.target
      if (target.nodeName === 'SPAN') {
        target = e.target.parentNode
      }
      target.blur()
      if (!this.timer) {
        this.readLog()
      }
      if (!this.progressValue) {
        this.timer = setInterval(() => {
          let progressValue = this.progressValue + 0.01
          this.progressValue = +progressValue.toFixed(2)
          if (this.progressValue >= 100) {
            clearInterval(this.timer)
          }
        }, 1000)
      }
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
      // 鼠标移上
      logBox.onmouseover = () => {
        console.log('onmouse over')
      }
      // 鼠标移出
      logBox.onmouseleave = () => {
        console.log('onmouse leave')
        this.startScroll = true
      }
      console.log('开始读取日志内容--', logBox)
      const res = await fileToBlob('./text_log.txt')
      const logList = res.split('\n')
      for (let index = 0; index < logList.length; index++) {
        // 滚动到盒子底部
        if (this.startScroll && logBox.scrollHeight > logBox.clientHeight) {
          setTimeout(() => {
            logBox.scrollTop = logBox.scrollHeight
          }, 0)
        }
        const logStr = await this.sleepFun(logList[index])
        // let today = new Date()
        //日期+时间的正则表达式
        // logStr.replace(
        //   /[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d/g,
        //   '8888888888888888888888888'
        // )
        const subDiv = document.createElement('div')
        subDiv.innerText = logStr
        logBox.append(subDiv)
      }
    },
    sleepFun(logStr) {
      return new Promise((res) => {
        return setTimeout(() => {
          res(logStr)
        }, 100)
      })
    },
    scrollChange() {
      console.log('日志滚动到底部')
      this.startScroll = false
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
    .file-inline {
      display: flex;
      margin-bottom: 16px;
      .file-lable {
        font-size: 16px;
        margin-right: 10px;
        margin-top: 8px;
        min-width: 120px;
        text-align: left;
      }
      .version-lable {
        font-size: 16px;
        margin-right: 10px;
        margin-top: 8px;
        min-width: 120px;
        text-align: right;
      }
    }
    .dataset,
    .modules {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: 16px;
    }
    .file-lable {
      font-size: 16px;
      margin-right: 10px;
      margin-top: 8px;
      min-width: 120px;
      text-align: left;
    }
    .file-dataset,
    .file-modules {
      display: flex;
      align-items: flex-start;
      width: 100%;
    }
    .dataset-info {
      width: 100%;
      padding: 5px;
      height: 50px;
      margin-top: 5px;
      margin-right: 10px;
      color: #a0a0a0;
      border: 1px solid #bbb;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .file-tag {
    position: absolute;
    top: 8px;
    left: 8px;
  }
  .file-input {
    // cursor: pointer;
    width: 100%;
    margin-right: 10px;
  }

  /deep/ .el-input__inner {
    cursor: pointer;
  }
  .start {
    margin: 20px 0;
    text-align: center;
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
    overflow-y: auto;
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