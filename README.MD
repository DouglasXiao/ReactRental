# Rental app based on Node.js

## target features

### Goal: 设计一款租房网站平台，可以满足以下几个功能

#### 提供房主发布信息
#### 租客可以浏览信息
#### 租客可以在信息发布栏浏览所有的租房信息
#### 租客可以在Google Map上面查看当前房子的信息(位置)
#### 展示第三方平台发布的租房信息， Vanpeople， VanSky， craiglist

### 技术架构

#### 服务器端： Node.js, Express, MongoDB
#### 前端框架: Vue.js, Semantic UI

### Reference: 

#### https://github.com/nswbmw/N-blog
#### http://expressjs.com/zh-cn/guide/using-middleware.html
#### https://semantic-ui.com/elements/loader.html

## git work steps

#### standard push

```bash
git checkout master
git pull
git merge LOCAL_BRANCH
git push origin LOCAL_BRANCH:master
```

#### push cross branch
```bash
git push origin meimei:master
```
> git push <remote> <local branch name>:<remote branch to push into>

## 运行 How to run

```bash
cd Rental

# install dependencies
npm install

# app running
npm start
```


	open localhost:2000


## 简介 Introduction

基于Node.js的爬虫系统。

爬取58同城上的杭州租房信息，并用百度地图进行可视化显示，方便用户快速查找自己附近的租房信息。

A crawler system based on Node.js.

The system will crawl rental information of 58 tongcheng, and Baidu map for visual display, user-friendly quickly find their own near the rental information.



![img](./views/image/1.png)   


![img](./views/image/2.png)


![img](./views/image/3.png)     


![img](./views/image/4.png)


## 目录结构 Directory Structure
<pre>
├─  package.json        # 项目配置 project configuration
├─  README.md           # 项目说明 project instruction
├─  app.js              # 项目入口文件 Project entry file
├─  node_modules        # npm依赖包 npm dependent
├─  .babelrc            # babel配置 babel configuration
│
│
├─  app                 # node后端业务 node business
      │
      │ controllers     #  控制器 controller
      │ models          #  数据模型 data model
      │ routes          #  路由 route
│
│
├─  bin                 # node启动 node start
│
│
└─  views               # 前端代码 front end code 
      │ css             # css文件 css
      │ js              # js文件 js
      │ image           # 图片文件 image
      │ index.html      # 首页 index
│
│
└─  config              # node配置 node configuration
</pre>


## 教程 Tutorial

[http://answershuto.github.io/jekyll/update/2016/10/25/养只爬虫当宠物-Node.js爬虫爬取58同城租房信息.html](http://answershuto.github.io/jekyll/update/2016/10/25/养只爬虫当宠物-Node.js爬虫爬取58同城租房信息.html)
