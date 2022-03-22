module.exports = {
  //路径前缀
  //publicPath: "./",
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/styles/echart.scss";'
      }
    }
  },
  devServer: {
    port: 1889,
    proxy: {
      '/api': {
        //本地服务接口地址
        // target: 'http://localhost',
        //远程演示服务地址,可用于直接启动项目
        // target: 'http://10086.jinkworld.com/api',
        // target: 'http://192.168.0.17/api',
        // target: 'http://192.168.0.17/api',
        // target: 'http://10.20.135.252/api',
		// target: 'http://192.168.1.52:89/api',
        target: 'http://192.168.0.29:88/api',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    })
  }
}
