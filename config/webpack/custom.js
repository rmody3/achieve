var path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve('./app/javascript/components'),
      '@utils': path.resolve('./app/javascript/utils')
    }
  }
}