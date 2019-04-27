# Rental app based on Node.js

## target features

### Goal: 设计一款租房网站平台，可以满足以下几个功能
 
 	租客可以浏览信息
 
 	租客可以在信息发布栏浏览所有的租房信息
 
 	租客可以在Google Map上面查看当前房子的信息(位置)
 
 	展示第三方平台发布的租房信息， Vanpeople， VanSky， craiglist

	提供房主发布信息

### 技术架构

	服务器端： Node.js, Express, MongoDB

	前后端通信：socket.io (Based on WebSocket)

	前端框架: React

	Data transfer format (To frontend, To Database): JSON

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


## Introduction

A crawler system based on Node.js in backend and React in frontend.

The system will crawl rental information of 58 tongcheng, and Baidu map for visual display, user-friendly quickly find their own near the rental information.

## Backend and Frontend architecture
![ReactRentalArchitecture](https://user-images.githubusercontent.com/12426243/56856249-484be180-690b-11e9-9f1a-1225e44fc1b5.jpg)

## Directory Structure
<pre>
|- app                  # node backend
     |
     |- controllers
     |- models          # data model
     |- routes          # route
|- bin                  # node start
|- config               # node configuration & express init
|- node_modules         # backend npm dependents
|- .babelrc             # babel configuration
|- .gitignore           # ignore untracked files
|- app.js               # project entry file
|- package.json         # project configuration
|- client               # React frontend
     |- node_modules    # frontend npm dependents
     |- public          # front page related code and icon
     |- src             # frontend entry & js, css source files
     |- .gitignore      # ignore untracked files
     |- package.json    # dependencies & proxy configurations
</pre>

## Web crawler js framework
SuperAgent (HTTP GET/POST Library): https://www.jianshu.com/p/98b854322260 \n
Cheerio (Decode the HTML text): https://github.com/cheeriojs/cheerio

## NodeJs backend bidirectional communication with React frontend
socket.io: https://socket.io/docs/

## FAQ
1. In MongoDB, always report "Error: connect ECONNREFUSED 127.0.0.1:27017"

A: Because the local mongodb is not started, which means not in service. Install and start local MongoDB service: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

2. dbo.collection is not a function

A: Because the way input db instance is not correct, should input the db instance parameter into callback functions.

3. After insert data successfully in code, how to check from shell command?

A: 1) mongo; 2) db = connect("mongodb://localhost:27017/localDB"); 3) db.rentalInfos.find({})
