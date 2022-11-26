<template>
  <div class="pannel">
    <div class="title">{{ checkItme.title }}</div>
    <div class="body" @click="goTo(checkItme.target)">
      <img :src="checkItme.img" alt="" class="pre-img" />
      <div class="mask">
        <h3>{{ checkItme.info }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pannel",
  props: {
    checkItme: {
      type: Object,
      default: () => {
        return {
          title: "面板标题",
          img: "https://www.datacanvas.com/img/news/1160-0.jpg",
          info: "简介",
          target: "https://www.baidu.com/"
        }
      }
    }
  },
  methods: {
    goTo (target) {
      console.log('选项被点击了---', target)
      this.$router.push("/detail")
      //   window.location.href = target
    }
  }
}
</script>

<style lang="scss" scoped>
.pannel {
  margin-right: 30px;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 22px;
    color: white;
    text-align: center;
    background-color: #409eff;
  }
  .body {
    position: relative;
    .pre-img {
      width: 100%;
      height: 100%;
      transition: 0.5s ease;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 20px;
      //   background: rgba(151, 151, 151, 0.7);
      //   box-shadow: 0px 0px 20px #888888;
      color: #ffffff;
      cursor: pointer;
      opacity: 0;
    }
  }

  .body:hover {
    .mask {
      opacity: 1;
    }
    .pre-img {
      filter: blur(6px);
    }
  }
}
</style>