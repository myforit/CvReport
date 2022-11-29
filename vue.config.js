const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  configureWebpack: {
    devServer: {
      port: 8080,
      proxy: {
        //跨域代理
        '/tupian': {
          target: 'http://172.20.1.181:9900/metacv/model/video_feed',
          ws: true,
          secure: false,
          changeOrigin: true, //是否开启跨域
          pathRewrite: {
            '^/tupian': '', //让路径以/api开头的字段为空
          },
        },
      },
    },
  },
})
