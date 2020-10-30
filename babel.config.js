module.exports = {
  // lintOnSave: false,//干掉语法检查
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [//引入vant组件库的配置
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: 'http://localhost.5000',
  //       changeOrigin: true//是否跨域
  //     }
  //   }
  // }
}
