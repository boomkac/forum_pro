const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true
      },
    }
  },
  productionSourceMap: false,
  lintOnSave: false,
  publicPath: './'
})
