Kejing test
# Rental app based on Node.js

## target features

### Goal: 设计一款租房网站平台，可以满足以下几个功能

 	提供房主发布信息
 
 	租客可以浏览信息
 
 	租客可以在信息发布栏浏览所有的租房信息
 
 	租客可以在Google Map上面查看当前房子的信息(位置)
 
 	展示第三方平台发布的租房信息， Vanpeople， VanSky， craiglist


### 技术架构

	服务器端： Node.js, Express, MongoDB

	前端框架: Vue.js, Semantic UI

### Reference: 

	https://github.com/nswbmw/N-blog

	http://expressjs.com/zh-cn/guide/using-middleware.html

	https://semantic-ui.com/elements/loader.html


## git work steps

#### standard master push

```bash
# commit on LOCAL_WORK_BRANCH
git add -A
git commit -m "comments"
# checkout to local master branch
git checkout master
# pull remote master
git pull
# merge LOCAL_WORK_BRANCH to local master
git merge LOCAL_WORK_BRANCH
# now local master has latest LOCAL_WORK_BRANCH and remote master, just push to remote master
git push
```

#### cross branch push
```bash
git push origin meimei:master
```

```bash
git push <remote> <local branch name>:<remote branch to push into>
```

#### delete branch

> Industrial level, every feature/bug has a local work branch, after work, delete this branch.

```bash
$ git push --delete <remote_name> <branch_name>
$ git branch -d <branch_name>
```
Note that in most cases the remote name is origin.

Delete Local Branch
To delete the local branch use one of the following:
```bash
$ git branch -d branch_name
$ git branch -D branch_name
```
Note: The -d option is an alias for --delete, which only deletes the branch if it has already been fully merged in its upstream branch. You could also use -D, which is an alias for --delete --force, which deletes the branch "irrespective of its merged status." [Source: man git-branch]

Delete Remote Branch [Updated on 8-Sep-2017]
As of Git v1.7.0, you can delete a remote branch using
```bash
$ git push <remote_name> --delete <branch_name>
$ git push <remote_name> :<branch_name>
```

## 运行 How to run

```bash
cd Rental

# install dependencies
npm install

# app running
npm start  (server side)

Then open a new tab in terminal, and

cd client
npm start  (client side)
```


	open localhost:3000


## 简介 Introduction

A crawler system based on Node.js in backend and React in frontend.

The system will crawl rental information of 58 tongcheng, and Baidu map for visual display, user-friendly quickly find their own near the rental information.

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


## Tutorial

https://zhuanlan.zhihu.com/p/24574485
