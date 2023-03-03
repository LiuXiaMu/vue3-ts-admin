const { defineConfig } = require('@vue/cli-service')
const path = require('path'); // 引入path模块
function resolve(dir) {
  return path.resolve(__dirname, dir) //path.join(_dirname)设置绝对路径
}
module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.resolve.alias
      //第一个参数：别名 第二个参数：路径
      .set('@', resolve('src'))
      .set('assets', resolve('./src/assets'))
      .set('components', resolve('./src/components'))
      .set('router', resolve('./src/router'))
      .set('ttt', resolve('./src/type'))
      .set('views', resolve('./src/views'))
      .set('public', resolve('./public'))
      .set('plugins', resolve('./src/plugins'))

  },
})
