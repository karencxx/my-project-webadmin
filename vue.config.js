const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  devServer: {
    port: 3100,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'httpService': resolve('src/utils/httpService')
      }
    }
  },
  transpileDependencies: ['element-ui'],
  pwa: {
    iconPaths: {
      favicon32: false,
      favicon16: false,
      appleTouchIcon: false,
      maskIcon: false,
      msTileImage: false
    }
  }
} 