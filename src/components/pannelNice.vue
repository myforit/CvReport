<template>
  <div
    class="pannel"
    @click="goTo(checkItme.target)"
  >
    <img
      :src="checkItme.img"
      class="pre-img"
    >
    <div class="title">
      <h3>{{ checkItme.title }}</h3>
    </div>
    <div class="info">{{ checkItme.info }}</div>
  </div>
</template>

<script>
export default {
  name: 'pannel-cv',
  props: {
    checkItme: {
      type: Object,
      default: () => {
        return {
          title: '面板标题',
          img: 'https://www.datacanvas.com/img/news/1160-0.jpg',
          info: '近期，“2022信创‘大比武’金融业务应用支撑技术赛道”总决赛圆满落幕，由九章云极DataCanvas公司和山西银行组成的1024队伍',
          target: 'https://www.baidu.com/'
        }
      }
    }
  },
  methods: {
    goTo(target) {
      console.log('选项被点击了---', target)
      target && this.$router.push(target)
    }
  }
}
</script>

<style lang="scss" scoped>
.pannel {
  padding: 10px;
  margin-left: 10px;
  margin-right: 20px;
  background-color: #ffffff;
  overflow: hidden;
  .pre-img {
    display: inline-block;
    width: 100%;
    height: 180px;
  }
  .title {
    margin-top: 20px;
  }
  .info {
    margin-top: 10px;
    font-size: 14px;
    height: 60px;
    color: #a0a0a0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.pannel:hover {
  box-shadow: 0px 0px 10px #bbb;
}
</style>