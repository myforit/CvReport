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
        '/caoliu': {
          target: 'https://get.xunfs.com/app/listapp.php', //这是我自己的接口，你们可以用来测试
          ws: true,
          secure: false,
          changeOrigin: true, //是否开启跨域
          pathRewrite: {
            '^/caoliu': '', //让路径以/api开头的字段为空
          },
        },
      },
    },
  },
})
