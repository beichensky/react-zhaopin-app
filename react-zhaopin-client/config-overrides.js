 const { override, fixBabelImports, addLessLoader, addPostcssPlugins } = require('customize-cra');

 module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: true,
    }),
    addLessLoader({
        // 这个属性添加之后关于数字的尺寸就会变成类似 8 * 1px 这种
        // strictMath: true,
        // modifyVars: { "@brand-primary": "#1DA57A" },
        modules: true,
        noIeCompat: true,
        javascriptEnabled: true,
        localIdentName: "[local]--[hash:base64:5]" // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    }),
    addPostcssPlugins([
        require('postcss-flexbugs-fixes'), 
        require('autoprefixer')({
            flexbox: 'no-2009'
        })
    ])
 );