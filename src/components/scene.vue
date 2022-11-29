<template>
  <div class="scene">
    <div
      v-for="(item, index) in sceneList"
      :key="index"
    >
      <div class="scene-title">
        <img
          :src="item.icon"
          alt=""
          class="scene-icon"
        />
        <h2>{{ item.title }}</h2>
      </div>
      <div class="scene-body">
        <div
          v-for="(check, i) in item.checks"
          :key="i"
          class="check"
        >
          <!-- <Pannel :checkItme="check"></Pannel> -->
          <PannelNice :checkItme="check"></PannelNice>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Pannel from './pannel.vue'
import PannelNice from './pannelNice.vue'

export default {
  name: 'scene-cv',
  components: {
    // Pannel,
    PannelNice
  },
  props: {
    sceneList: {
      type: Array,
      default: () => [
        {
          title: '工况场景',
          icon: require('@/assets/1.png'),
          checks: [
            {
              title: '手机检测',
              img: 'https://www.datacanvas.com/img/news/1160-0.jpg',
              info: '2022信创‘大比武’金融业务应用支撑技术赛道”总决赛圆满落幕，由九章云极DataCanvas公司和山西银行组成的1024队',
              target: 'https://blog.csdn.net/'
            },
            {
              title: '口罩佩戴检测',
              img: 'https://www.datacanvas.com/img/news/1158-0.jpg',
              info: '凭借金融信创方案领先的技术水平、突出的创新能力、广泛的应用前景、高度的安全性等优势，荣获“技术创新开拓奖',
              target: 'https://www.cnblogs.com/'
            },
            {
              title: '在岗离岗检测',
              img: 'https://www.datacanvas.com/img/news/1157-0.jpg',
              info: '金融业务应用支撑技术赛道”由北京航空航天大学、北京理工大学、中国电子工业标准',
              target: 'https://www.baidu.com/'
            },
            {
              title: '人员滞留检测',
              img: 'https://www.datacanvas.com/img/news/1156-0.jpg',
              info: '自7月启动报名以来备受业界瞩目，最终由业界知名机构和信息技术企业独立或联合组建的38支团队进入总决赛',
              target: 'https://www.mi.com/'
            },
            {
              title: '人员入侵检测',
              img: 'https://www.datacanvas.com/img/news/1155-0.jpg',
              info: '章云极DataCanvas公司和山西银行组成的1024队经过层层选拔和激烈角逐，成功入围。',
              target: 'https://www.iconfont.cn/'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.scene {
  padding-left: 10px;
  .scene-title {
    display: flex;
    margin-bottom: 20px;
    .scene-icon {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
  .scene-body {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    margin-left: -10px;
    .check {
      box-sizing: border-box;
      width: 33.33%;
      // height: 260px;
      margin-bottom: 30px;
    }
  }
}
</style>