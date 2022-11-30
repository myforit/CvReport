# cv-report

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 部署到服务器
将dist上传到服务器
```
scp -r dist 用户名@ip:/tmp

ls | grep dist  

sudo mv dist /var/www/html

cd /var/www/html

sudo mv dist/* ./

sudo rm -rf dist
```
