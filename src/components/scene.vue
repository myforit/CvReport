<template>
  <div class="scene">
    <div v-for="(item, index) in sceneList" :key="index">
      <div class="scene-title">
        <img :src="item.icon" alt="" class="scene-icon" />
        <h2>{{ item.title }}</h2>
      </div>
      <div class="scene-body">
        <div v-for="(check, i) in item.checks" :key="i" class="check">
          <Pannel :checkItme="check"></Pannel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pannel from "./pannel.vue"

export default {
  name: "Scene",
  components: {
    Pannel
  },
  props: {
    sceneList: {
      type: Array,
      default: () => [
        {
          title: "工况场景",
          icon: require("@/assets/1.png"),
          checks: [
            {
              title: "手机检测",
              img: "https://www.datacanvas.com/img/news/1160-0.jpg",
              info: "2022信创‘大比武’金融业务应用支撑技术赛道”总决赛圆满落幕，由九章云极DataCanvas公司和山西银行组成的1024队",
              target: "https://blog.csdn.net/"
            },
            {
              title: "口罩佩戴检测",
              img: "https://www.datacanvas.com/img/news/1158-0.jpg",
              info: "凭借金融信创方案领先的技术水平、突出的创新能力、广泛的应用前景、高度的安全性等优势，荣获“技术创新开拓奖",
              target: "https://www.cnblogs.com/"
            },
            {
              title: "在岗离岗检测",
              img: "https://www.datacanvas.com/img/news/1157-0.jpg",
              info: "金融业务应用支撑技术赛道”由北京航空航天大学、北京理工大学、中国电子工业标准",
              target: "https://www.baidu.com/"
            },
            {
              title: "人员滞留检测",
              img: "https://www.datacanvas.com/img/news/1156-0.jpg",
              info: "自7月启动报名以来备受业界瞩目，最终由业界知名机构和信息技术企业独立或联合组建的38支团队进入总决赛",
              target: "https://www.mi.com/"
            },
            {
              title: "人员入侵检测",
              img: "https://www.datacanvas.com/img/news/1155-0.jpg",
              info: "章云极DataCanvas公司和山西银行组成的1024队经过层层选拔和激烈角逐，成功入围。",
              target: "https://www.iconfont.cn/"
            }
          ]
        },
        {
          title: "印章场景",
          icon: "https://img-blog.csdnimg.cn/dca6690da7344e238c48c4ccddb5d0d6.png",
          checks: [
            {
              title: "印章相似度",
              img: "https://www.datacanvas.com/img/news/1160-0.jpg",
              info: "2022信创‘大比武’金融业务应用支撑技术赛道”总决赛圆满落幕，由九章云极DataCanvas公司和山西银行组成的1024队",
              target: "https://blog.csdn.net/"
            },
            {
              title: "印章检测",
              img: "https://www.datacanvas.com/img/news/1158-0.jpg",
              info: "凭借金融信创方案领先的技术水平、突出的创新能力、广泛的应用前景、高度的安全性等优势，荣获“技术创新开拓奖",
              target: "https://www.cnblogs.com/"
            },
            {
              title: "印章识别",
              img: "https://www.datacanvas.com/img/news/1157-0.jpg",
              info: "金融业务应用支撑技术赛道”由北京航空航天大学、北京理工大学、中国电子工业标准",
              target: "https://www.baidu.com/"
            }
          ]
        },
        {
          title: "证照识别",
          icon: "https://img-blog.csdnimg.cn/4fbce95628fc466ca8e4efc581b2b307.png",
          checks: [
            {
              title: "身份证识别",
              img: "https://www.datacanvas.com/img/news/1160-0.jpg",
              info: "2022信创‘大比武’金融业务应用支撑技术赛道”总决赛圆满落幕，由九章云极DataCanvas公司和山西银行组成的1024队",
              target: "https://blog.csdn.net/"
            },
            {
              title: "车牌识别",
              img: "https://www.datacanvas.com/img/news/1158-0.jpg",
              info: "凭借金融信创方案领先的技术水平、突出的创新能力、广泛的应用前景、高度的安全性等优势，荣获“技术创新开拓奖",
              target: "https://www.cnblogs.com/"
            }
          ]
        },
        {
          title: "缺陷场景",
          icon: "https://img-blog.csdnimg.cn/3f357039fc774e3187087ffc9002a8ad.png",
          checks: [
            {
              title: "手机缺陷分割",
              img: "https://www.datacanvas.com/img/news/1160-0.jpg",
              info: "2022信创‘大比武’金融业务应用支撑技术赛道”总决赛圆满落幕，由九章云极DataCanvas公司和山西银行组成的1024队",
              target: "https://blog.csdn.net/"
            },
            {
              title: "钢铁缺陷分割",
              img: "https://www.datacanvas.com/img/news/1158-0.jpg",
              info: "凭借金融信创方案领先的技术水平、突出的创新能力、广泛的应用前景、高度的安全性等优势，荣获“技术创新开拓奖",
              target: "https://www.cnblogs.com/"
            }
          ]
        },
        {
          title: "医疗场景",
          icon: "https://img-blog.csdnimg.cn/df6c205ded6546c6ba2ee26db3f36921.png",
          checks: [
            {
              title: "肺结核分割",
              img: "https://www.datacanvas.com/img/news/1160-0.jpg",
              info: "2022信创‘大比武’金融业务应用支撑技术赛道”总决赛圆满落幕，由九章云极DataCanvas公司和山西银行组成的1024队",
              target: "https://blog.csdn.net/"
            }
          ]
        },
        {
          title: "覆盖率计算",
          icon: "https://img-blog.csdnimg.cn/26f7a30d9b07469890fe964acd119069.png",
          checks: [
            {
              title: "面包上货率",
              img: "https://www.datacanvas.com/img/news/1160-0.jpg",
              info: "2022信创‘大比武’金融业务应用支撑技术赛道”总决赛圆满落幕，由九章云极DataCanvas公司和山西银行组成的1024队",
              target: "https://blog.csdn.net/"
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
    .check {
      box-sizing: border-box;
      width: 33.33%;
      height: 220px;
      margin-bottom: 80px;
    }
  }
}
</style>