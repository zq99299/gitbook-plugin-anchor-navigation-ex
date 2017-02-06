Math integration with GitBook
==============
### 本插件的功能：
1. 添加toc到侧边悬浮导航
2. 可自动提取页面标题排序
3. 默认给页面所有标题添加 锚点效果
### 注意事项：
1. 本插件只会提取 h[1-3] 标签作为悬浮导航
2. 只有按照以下顺序嵌套才会被提取
```
# h1
## h2
### h3

# h1
## h2
### h3

以下的写法不会被提取：直接写h2标签
## h2 

```

### 致敬
本插件结合以下插件的功能，并直接重构他们的源码。
1. https://github.com/zhangzq/gitbook-plugin-navigator
2. https://github.com/yaneryou/gitbook-plugin-anchor-navigation


### Sample
 https://zq99299.gitbooks.io/gitbook-guide/content/chapter/plugin.html
 
 ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/gitbook-plugin-anchor-navigation-ex-demo2.jpg)
 ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/gitbook-plugin-anchor-navigation-ex-demo.jpg)



### How to use it?

Add it to your `book.json` configuration:

```
{
  "plugins": [
       "anchor-navigation-ex"
  ]
}
```

Install your plugins using:

```
$ gitbook install ./
``` 

### Configuration

You can force the use of svg pre-processed by adding to your book.json:

```
{
 "pluginsConfig": {	   
		"anchor-navigation-ex":{
			"isRewritePageTitle":true
		}	   
  }	
}
```
 

**isRewritePageTitle :**
 是否重写页面标题，true: 将会按照当前页标题顺序自动重写标题,比如：
```
源码标题为：
# 我是h1标题
## 我是h2标题
被重写之后：在页面看到的效果将是
1. 我是h1标题
1.1 我是h2标题
```


### or Install locally

```
$ npm install gitbook-plugin-anchor-navigation-ex --save
```

>open npm : https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex

### Update record
#### 2017-02-06
* 完全重写代码
* 合并锚点和悬浮导航效果，现在只需要引入一个插件了 gitbook-plugin-anchor-navigation-ex

#### 2017-01-18
* 页面没有h[1-3] 标签生成失败

#### 2017-01-22
* 2017-01-18 提交的有问题。重新修复
