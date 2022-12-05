const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  devServer: {
    port: 8080,
    proxy: {
      //跨域代理
      '/dataset': {
        target: 'http://172.20.1.181:9900/metacv/data/query',
        ws: true,
        secure: false,
        changeOrigin: true, //是否开启跨域
        pathRewrite: {
          '^/dataset': '', //让路径以/api开头的字段为空
        },
      },
    },
  },
})
