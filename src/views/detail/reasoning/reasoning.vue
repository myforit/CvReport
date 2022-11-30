<template>
  <div class="reason-box">
    <h3 class="run">您正在使用xxx.pth进行推理</h3>
    <div class="file-box">
      <el-row>
        <el-col :span="19">
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
          <el-button
            ref="start"
            type="primary"
            class="start"
            @click="startRun"
          >
            开始推理
          </el-button>
        </el-col>
      </el-row>
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
    <!-- 推理结果展示 -->
    <div
      class="wraper"
      v-if="startFlag"
      :style="resBackImg"
    >
      <h3>推理结果：</h3>
      <el-image
        :src="imgSrc"
        alt=""
        v-show="showRes"
        @load="successLoad"
        @error="errorLoad"
        class="reas"
      >
        <!-- <span
          slot="error"
          class="error-img"
        >图片加载失败......</span> -->
        <!-- <img
          slot="error"
          class="error-img"
          src="https://img-blog.csdnimg.cn/6c56568ac6a8446aa6f1d76caf0b466e.png"
          alt=""
        > -->
      </el-image>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reasoning-cv',
  data() {
    return {
      input2: '',
      placeFile: '请上传视频',
      fileName: '',
      startFlag: false,
      showRes: false,
      imgSrc: '',
      imgFlow: 'http://172.20.1.181:9900/metacv/model/video_feed',
      resBackImg: {
        backgroundImage:
          "url('https://img-blog.csdnimg.cn/img_convert/63ea90b2b970640722c2caf66d18cb5f.jpeg')"
      }
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
    uploadData(e) {
      // var e = window.event || e // change事件获取到的数据
      if (e.target.files[0].size > 500 * 1024 * 1024) {
        // 限制文件上传大小
        console.log('限制文件上传大小500')
      } else {
        if (e.target.files.length > 0) {
          this.placeFile = ''
          this.progressValue = null
          console.log('得到的文件是----', e.target.files)
          this.fileName = e.target.files[0].name
        }
      }
    },
    delFile() {
      this.fileName = ''
      this.placeFile = '请上传视频'
      this.startFlag = false
      this.imgSrc = ''
    },
    startRun(e) {
      console.log('开始推理------', e)
      this.resBackImg = {
        backgroundImage:
          "url('https://img-blog.csdnimg.cn/img_convert/63ea90b2b970640722c2caf66d18cb5f.jpeg')"
      }
      let target = e.target
      if (target.nodeName === 'SPAN') {
        target = e.target.parentNode
      }
      target.blur()
      // if (this.fileName === '') {
      //   return
      // }
      this.imgSrc = 'http://172.20.1.181:9900/metacv/model/video_feed'
      // setTimeout(() => {
      //   this.showRes = true
      // }, 1000);
      this.startFlag = true
    },
    successLoad() {
      console.log('图片加载成功')
      this.showRes = true
      // this.resBackImg = {}
    },
    errorLoad() {
      console.log('图片加载失败')
      // this.resBackImg = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.reason-box {
  height: 100%;
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
  .wraper {
    width: 100%;
    height: 91%;
    padding: 10px 0 10px 0;
    background-image: url('https://img-blog.csdnimg.cn/img_convert/63ea90b2b970640722c2caf66d18cb5f.jpeg');
    background-size: 680px 400px;
    background-repeat: no-repeat;
    background-position: center;
    .reas {
      margin-top: 5px;
      // width: 100%;
      height: 96%;
    }
    // .error-img {
    //   width: 100%;
    //   height: 100%;
    //   display: block;
    // }
  }
}
</style>