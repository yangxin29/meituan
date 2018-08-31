module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000',
	      changeOrigin: true // 必须加上这个才能跨域请求
      }
    }
  }
}

// test
