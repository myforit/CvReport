<template>
  <div id="app">
    <div
      class="header"
      @click="goHome"
    >
      <div class="massage">
        <img
          src="https://www.datacanvas.com/img/icon/logo.svg?v2"
          alt=""
          class="logo"
        />
        <span class="info">
          <h1 class="title">计算机视觉开发平台-1024小神</h1>
          <span class="simple">精选多个应用场景，助您应用快速起步</span>
        </span>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  methods: {
    goHome() {
      this.$router.push('/').catch((err) => {
        return err
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  // position: relative;
  // overflow: hidden;
  .header {
    background: #171717;
    padding-left: 10px;
    padding: 0px 15.5%;
  }
  .massage {
    display: flex;
    align-items: center;
    height: 120px;
    margin: 0 auto;
    color: white;
    .logo {
      width: 240px;
      height: 68px;
    }
    .info {
      margin-left: 50px;
      .simple {
        font-size: 20px;
      }
    }
  }
  .main {
    // height: calc(100% - 120px);
    min-height: 100%;
    margin: 0 auto;
    padding-top: 20px;
    padding: 20px 15%;
    background: #efefef;
    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: none;
    // position: absolute;
    // left: 0;
    // top: 120px;
    // right: -17px;
    // bottom: 0;
    overflow-x: hidden;
    // overflow-y: scroll;
  }
  // ::-webkit-scrollbar {
  //   display: none;
  // }
}
</style>
