###  Getting Started
#### Downloading
Input this commmand in your terminal
```
克隆本分支到本地：
git clone https://github.com/kunyashaw/oauth2-server.git
```
#### Installing
```
进入本地目录，安装依赖
npm install
```
#### Using it
To initialize the datebase:
```
初始化数据库
npm run seed
```


```
将react编写的html对应的jsx文件编译为js
npm run build
```


```
启动开发服务器
npm run start
```

### How it works
#### Configuration
- ./config.js : You can config client,  server,  port,  database, etc.
- ./config/ldapConfig.js: To config the LDAP protocal.

#### Getting AccessToken
Once an accessToken is generated, auth-server will send it both to client and backend server. So,  backend server should provide an API for auth server to post user token.
You should exchange **config.token_destination**  by this API.