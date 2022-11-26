<template>
  <Scene></Scene>
</template>

<script>
import Scene from "@/components/scene.vue"

export default {
  name: "Home",
  components: {
    Scene
  },
  data () {
    return {
      sceneList: [
        {
          title: "工况场景",
          icon: "https://www.datacanvas.com/img/index/customers-pc2.png",
          sceneList: [
            {
              name: "手机检测",
              preImg: "https://www.datacanvas.com/img/solution/img-03.jpg",
              info: "该产品已经在金融行业应用了数年的时间，从中积累了大量的有用经验"
            },
            {
              name: "口罩佩戴检测",
              preImg: "https://www.datacanvas.com/img/solution/img-03.jpg",
              info: "该产品已经在金融行业应用了数年的时间，从中积累了大量的有用经验"
            },
            {
              name: "在岗离岗检测",
              preImg: "https://www.datacanvas.com/img/solution/img-03.jpg",
              info: "该产品已经在金融行业应用了数年的时间，从中积累了大量的有用经验"
            },
            {
              name: "人员滞留检测",
              preImg: "https://www.datacanvas.com/img/solution/img-03.jpg",
              info: "该产品已经在金融行业应用了数年的时间，从中积累了大量的有用经验"
            },
            {
              name: "人员入侵检测",
              preImg: "https://www.datacanvas.com/img/solution/img-03.jpg",
              info: "该产品已经在金融行业应用了数年的时间，从中积累了大量的有用经验"
            },
          ]
        },
        {
          title: "印章场景",
          icon: "https://www.datacanvas.com/img/index/customers-pc2.png",
          sceneList: [
            {
              name: "手机检测",
              preImg: "https://www.datacanvas.com/img/solution/img-03.jpg",
              info: "该产品已经在金融行业应用了数年的时间，从中积累了大量的有用经验"
            },
            {
              name: "口罩佩戴检测",
              preImg: "https://www.datacanvas.com/img/solution/img-03.jpg",
              info: "该产品已经在金融行业应用了数年的时间，从中积累了大量的有用经验"
            },
            {
              name: "在岗离岗检测",
              preImg: "https://www.datacanvas.com/img/solution/img-03.jpg",
              info: "该产品已经在金融行业应用了数年的时间，从中积累了大量的有用经验"
            },
            {
              name: "人员滞留检测",
              preImg: "https://www.datacanvas.com/img/solution/img-03.jpg",
              info: "该产品已经在金融行业应用了数年的时间，从中积累了大量的有用经验"
            },
            {
              name: "人员入侵检测",
              preImg: "https://www.datacanvas.com/img/solution/img-03.jpg",
              info: "该产品已经在金融行业应用了数年的时间，从中积累了大量的有用经验"
            },
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>