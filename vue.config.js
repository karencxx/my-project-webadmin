const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' 
    ? process.env.VUE_APP_CDN_URL 
    : '/',
  productionSourceMap: false,
  
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // GZIP压缩
      config.plugins.push(
        new CompressionPlugin({
          test: /\.(js|css|html)$/,
          threshold: 10240 // 大于10kb的文件才压缩
        })
      )
      
      // 代码压缩
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true, // 移除console
                drop_debugger: true // 移除debugger
              }
            }
          })
        ]
      }
      
      // 分包策略
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]element-ui[\\/]/
          }
        }
      }
    } else {
      // 开发环境配置
    }
  },

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    
    // 设置别名
    config.resolve.alias
      .set('@', path.resolve('src'))
  }
} 