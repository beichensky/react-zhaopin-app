# react-zhaopin-app

#### 项目预览
请打开浏览器，在手机模式下查看：**[线上项目地址](http://47.98.186.152)**


#### 介绍
一款比较简易的招聘类 WebApp 项目，之前在尚硅谷视频中学习过类似项目，
最近花了点时间使用 `React Hooks` + `Mobx` + `TypeScript` + `Nest` 进行了改写。希望能够对需要的朋友提供一些帮助。

该项目具备登录注册、路由切换、上拉刷新、下拉加载、即时通讯等功能；
项目代码包含服务端和客户端，均可下载查看。

- 客户端项目说明文档：[前端项目启动说明](https://github.com/beichensky/react-zhaopin-app/blob/master/react-zhaopin-client/README.md)

- 服务端项目说明文档：[服务端项目启动说明](https://github.com/beichensky/react-zhaopin-app/blob/master/react-zhaopin-server/README.md)


#### 软件架构
1、客户端脚手架使用 `create-react-app`
    主要技术为：`React` + `React-Router` + `Mobx` + `Antd-Mobile` + `TypeScript`
    项目中组件以及 `API` 均使用 `hooks` 的方式进行代码编写。

2、服务端脚手架使用 `nest-cli`
    主要技术为：`Nest` + `MongoDB` + `Mogoose`


#### 项目运行

1、启动 MongoDB 数据库

``` bash
mongod
```

2、运行服务端项目
``` bash
cd react-zhaopin-server

yarn install

yarn start:dev
```

3、运行客户端项目
``` bash
cd react-zhaopin-client

yarn install

yarn start
```

#### 使用说明

1、请确保服务端和客户端代码已经安装了相应的依赖

2、请确保先启动了 MongoDB 数据库，之后启动服务器才能正常连接

3、启动服务器之后，再启动客户端
