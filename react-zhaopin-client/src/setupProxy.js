/*
 * filename: setupProxy
 * overvuew: 项目中网络请求相关代理配置
 */

module.exports = function(app) {
    const proxy = require('http-proxy-middleware');
    app.use(proxy('/api', { 
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
            '^/api/': '/'
          },
    }));
};