const path = require('path');
module.exports = {
  lintOnSave: false,//干掉语法检查
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@comp': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@store': path.resolve(__dirname, 'src/store'),
        style: path.resolve(__dirname, 'src/style')
      }
    }
  },
}