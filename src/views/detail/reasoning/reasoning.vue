<template>
  <div class="reason-box">
    <h3 class="run">您正在使用xxx。pth进行推理</h3>
    <div class="file-box">
      <el-row>
        <el-col :span="20">
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
              <el-button type="primary">上传视频</el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button ref="start" type="primary" class="start" @click="startRun">
            开始推理
          </el-button>
        </el-col>
      </el-row>
      <div class="file-tag" v-if="hasFile">
        <span class="el-tag el-tag--info el-tag--small el-tag--light">
          <span class="el-select__tags-text">{{ fileName }}</span>
          <i class="el-tag__close el-icon-close" @click="delFile"></i>
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
  </div>
</template>

<script>
export default {
  name: "Reasoning",
  data () {
    return {
      input2: "",
      placeFile: "请上传视频",
      fileName: "",
    }
  },
  computed: {
    hasFile () {
      return this.fileName !== ""
    }
  },
  methods: {
    selectFile () {
      console.log("选择文件")
      this.$refs.file.click()
    },
    uploadData (e) {
      var e = window.event || e  // change事件获取到的数据
      if (e.target.files[0].size > 500 * 1024 * 1024) { // 限制文件上传大小
        ElMessage.error('上传单个文件大小不能超过 500M!')
      } else {
        if (e.target.files.length > 0) {
          this.placeFile = ""
          this.progressValue = null
          console.log('得到的文件是----', e.target.files)
          this.fileName = e.target.files[0].name
        }
      }
    },
    startRun (e) {
      console.log('开始推理------', e)
      e.target.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
.reason-box {
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
  .run {
    margin-bottom: 10px;
  }
  .file-box {
    position: relative;
    .start {
      margin-left: 10px;
    }
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
}
</style>