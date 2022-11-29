<template>
  <div class="train-box">
    <div class="file-box">
      <el-input
        :placeholder="placeFile"
        v-model="input2"
        clearable
        readonly
        class="file-input"
        ref="fileInput"
        @click.native="selectFile"
      >
        <template slot="append">
          <el-button type="primary">上传数据集</el-button>
        </template>
      </el-input>
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
            <el-form-item label="使用CPU数量">
              <el-input
                v-model="sizeForm.cpu"
                placeholder="请输入使用CPU数量"
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
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        text-color="white"
        :percentage="progressValue"
      ></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'train-cv',
  data() {
    return {
      input2: '',
      activeNames: [''],
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
          this.progressValue += 1
          if (this.progressValue >= 100) {
            clearInterval(this.timer)
          }
        }, 100)
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
  }
  .file-tag {
    position: absolute;
    top: 8px;
    left: 8px;
  }
  .file-input {
    cursor: pointer;
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
  /deep/.el-progress {
    height: 0px !important;
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
}
</style>