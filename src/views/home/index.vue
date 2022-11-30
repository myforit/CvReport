<template>
  <Scene :scene-list="sceneList"></Scene>
</template>

<script>
import Scene from '@/components/scene.vue'

export default {
  name: 'home-cv',
  components: {
    Scene
  },
  data() {
    return {
      sceneList: [
        {
          title: '工况场景',
          icon: require('@/assets/1.png'),
          checks: [
            {
              title: '手机检测',
              img: require('../../assets/shouji.jpg'),
              info: '检测涉密及危险区域等环境中违规使用手机， 替换传统人工值守， 减少中心管理人员的劳动强度，并提高效率',
              target: '/detail'
            },
            {
              title: '口罩佩戴检测',
              img: require('../../assets/kouzhao.jpg'),
              info: '检测特定环境下指定场所是否佩戴口罩，通过实时显示和语音播报提醒人员佩戴口罩，减少人工值守劳动强度',
              target: ''
            },
            {
              title: '在岗离岗检测',
              img: require('../../assets/zaigangligang.jpg'),
              info: ' 检测值班人员是否长时间下违规离岗， 替代传统人工值守和人工巡查方式， 设定值班人员和离岗时间进行判断',
              target: ''
            }
          ]
        },
        {
          title: '印章场景',
          icon: require('../../assets/2.png'),
          checks: [
            {
              title: '印章相似度',
              img: require('../../assets/yinzhangxiangsi.png'),
              info: '比较两枚印章相似程度，返回相似度量化值。该相似度为结构相似度度量，对色度、光度不敏感。输入需为印章部分的图片',
              target: ''
            },
            {
              title: '印章检测',
              img: require('../../assets/yinzhangjiance.jpg'),
              info: '检测PDF或图片文件中的印章，返回印章位置及抠取的印章图片。目前支持圆形章和椭圆章的检测',
              target: ''
            },
            {
              title: '印章识别',
              img: require('../../assets/yinzhanghsibie.png'),
              info: '检测并识别PDF或图片文件中的印章并识别印章文字，返回印章位置及文字内容。目前支持圆形章和椭圆章的检测识别',
              target: ''
            }
          ]
        },
        {
          title: '安防识别',
          icon: require('../../assets/7.png'),
          checks: [
            {
              title: '人员滞留检测',
              img: require('../../assets/renyuanzhiliu.jpg'),
              info: '检测人员是否长期出现在敏感场所。对滞留人员情况进行详细的记录， 及时发现可疑人员，并上报给管理人员',
              target: ''
            },
            {
              title: '人员入侵检测',
              img: require('../../assets/renyuanruqin.jpg'),
              info: '检测是否有人出现在敏感场所或者指定区域。对入侵人员情况进行详细的记录， 及时发现可疑人员， 并上报给管理人员',
              target: ''
            }
          ]
        },
        {
          title: '证照识别',
          icon: require('../../assets/3.png'),
          checks: [
            {
              title: '身份证识别',
              img: require('../../assets/shenfenzheng.png'),
              info: '识别二代居民身份证正反两面的全部8个字段，并可通过自定义后处理，全方位满足不同使用场景中对身份证任意字段的识别需求，大幅降低人工成本',
              target: ''
            },
            {
              title: '车牌识别',
              img: require('../../assets/chepaishibie.png'),
              info: '识别多种颜色大陆机动车车牌，自动检测并识别车牌号码、车牌颜色等信息，可应用于停车场、小区等场景，实现无卡、无人的车辆进出场自动化',
              target: ''
            }
          ]
        },
        {
          title: '缺陷场景',
          icon: require('../../assets/4.png'),
          checks: [
            {
              title: '手机缺陷分割',
              img: require('../../assets/shoujiquexian.jpg'),
              info: '在手机屏幕工业化生产过程中，缺陷的检出直接影响其合格率。通过分割手机屏幕表面的油污、孔洞和划痕，协助手机屏幕出厂品质控制',
              target: ''
            },
            {
              title: '钢铁缺陷分割',
              img: require('../../assets/gangtie.jpg'),
              info: '为了提高钢铁生产自动化水平，提高钢铁瑕疵检出的效率和精度尤为重要。通过分割钢铁在出厂时的瑕疵，帮助钢铁生产现场的质量控制',
              target: ''
            }
          ]
        },
        {
          title: '医疗场景',
          icon: require('../../assets/5.png'),
          checks: [
            {
              title: '肺结核分割',
              img: require('../../assets/feijiejie.jpg'),
              info: '肺结节指肺部影像上各种大小、边缘清楚或模糊、直径小于等于3cm的局灶性圆形致密影。通过分割出肺内有肺结节的区域，协助医生进行肺部诊断',
              target: ''
            }
          ]
        },
        {
          title: '覆盖率计算',
          icon: require('../../assets/6.png'),
          checks: [
            {
              title: '面包上货率',
              img: require('../../assets/mianbao.png'),
              info: '快速计算感兴趣区域内特定物品的覆盖率，适用于商超货架、货车箱等场景。如面包货架上面包商品占货架比例，即面包上货率实时计算',
              target: ''
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>