DOC：中文，[English](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/blob/master/README_EN.md)

GitBook 插件：gitbook-plugin-anchor-navigation-ex



[![GitHub issues](https://img.shields.io/github/issues/zq99299/gitbook-plugin-anchor-navigation-ex.svg)](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/issues) [![GitHub issues](https://img.shields.io/github/issues-closed/zq99299/gitbook-plugin-anchor-navigation-ex.svg)](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/issues?q=is%3Aissue+is%3Aclosed) [![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/LICENSE) [![npm](https://img.shields.io/npm/v/gitbook-plugin-anchor-navigation-ex.svg)](https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex) [![npm](https://img.shields.io/npm/dt/gitbook-plugin-anchor-navigation-ex.svg)](https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex)


-----

### 插件效果
* 风格：极简
* 效果图
  - Sample: https://zq99299.gitbooks.io/gitbook-guide/content/chapter/plugin.html
  - night主题展示
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/night主题展示.jpg)
  - sepia主题展示
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/sepia主题展示.jpg)
  - white主题展示
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/white主题展示.jpg)    
  - 锚点效果和top展示
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/锚点效果和top展示.jpg) 
  - toc标题icon展示
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/toc标题icon展示.jpg) 
  - toc标题icon展示
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/toc标题icon展示2.jpg) 
   - toc标题无icon展示
   ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/toc标题无icon展示.jpg)      

### 插件功能：
1. 添加Toc到侧边悬浮导航
2. 可自动提取页面标题排序
3. 默认给页面所有标题添加 锚点效果
4. 可定制TocIcon是否显示和显示的图标
5. 样式跟随gitbook 默认主题 样式（默认主题样式切换本插件样式也跟随切换）

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

### 怎么使用本插件？

在你的 `book.json` 中增加插件：

```
{
  "plugins": [
       "anchor-navigation-ex"
  ]
}
```

然后安装插件:

```
$ gitbook install ./
``` 

### 定制插件功能

在你的 book.json 中配置:

```
{
 "pluginsConfig": {	   
		"anchor-navigation-ex":{
			"isRewritePageTitle":true,
			"isShowTocTitleIcon":true,
            "tocLevel1Icon":"fa fa-hand-o-right",
            "tocLevel2Icon":"fa fa-hand-o-right",
            "tocLevel3Icon":"fa fa-hand-o-right"
		}	   
  }	
}
```
 

- **isRewritePageTitle :** 
是否重写页面标题，true: 将会按照当前页标题顺序自动重写标题,比如：

```
源码标题为：
# 我是h1标题
## 我是h2标题
被重写之后：在页面看到的效果将是
1. 我是h1标题
1.1 我是h2标题
```
- **isShowTocTitleIcon :** 
是否显示悬浮导航TOC标题前的图标，true:显示，false:不显示（默认）
- **tocLevel1Icon :** 
悬浮导航TOC标题前的H1图标样式. 默认为空；示例：比如：fa fa-address-book 
- **tocLevel2Icon :** 
悬浮导航TOC标题前的H2图标样式. 默认为空；示例：比如：fa fa-address-book
- **tocLevel3Icon :** 
悬浮导航TOC标题前的H3图标样式. 默认为空；示例：比如：fa fa-address-book

#### 关于标题重写 与 主题默认 层级 显示的关系 V0.3.+
如果你的配置是这样的：
```
"pluginsConfig": {	   
		"anchor-navigation-ex":{
			"isRewritePageTitle":true
		},
       "theme-default": {
            "showLevel": true
        }
  }	
```
那么页面标题重写后的示例如下：
SUMMARY.md
```
# Summary

* [前言](README.md)

---
  xxxxx
---

* [Redis](chapter/redisREADME.md)
  * [windows](chapter/redis/windows.md)
  * [集群](chapter/redis/cluster.md)
```
chapter/redis/cluster.md
```
# redis集群的准备
## zlib
1. 安装redis-cluster依赖:redis-cluster的依赖库在使用时有兼容问题,在reshard时会遇到各种错误,请按指定版本安装.
2. 确保系统安装zlib,否则gem install会报(no such file to load -- zlib)

...
```
最终呈现在页面的效果如下：
![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/标题重新与默认主题层级相关联.jpg)

#### 关于悬浮导航TOC标题前的图标样式支持说明
悬浮导航TOC标题前的图标样式。可接收的值得有：`http://fontawesome.dashgame.com/` 中标出来的图标；
比如：fa fa-address-book

理论上支持所有css图标，前提是得引入css。

由于`http://fontawesome.dashgame.com/`该css是官方主题引用的。所以你不用额外的引入了



### 或则安装到本地

```
$ npm install gitbook-plugin-anchor-navigation-ex --save
```

>open npm : https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex


### Update record
#### v0.3.0 - 2017-03-06
- 官方层级显示功能 与  每页 相关联显示功能[#4](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/pull/4)


#### v0.2.7 - 2017-03-01
- fix bug: 锚链接索引唯一 [#6](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/pull/6)

#### v0.2.6 - 2017-03-01
- fix bug: [#5](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/pull/5)

#### v0.2.5 - 2017-02-17

1. 进一步优化悬浮导航的样式，和官方默认主题保持一致，更加美观，和格调统一
2. 增加 悬浮导航toc标题前的图标定制 [#2](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/issues/2)

#### v0.1.9 - 2017-02-17
优化悬浮导航的样式

1. 将阴影缩小，面板背景略微透明
2. 文字显示为 14 px
3. 标题编号 加粗显示
4. 适配 官方默认3套主题样式。导航样式将随着皮肤主题的样式变换而变换

#### v0.1.8 - 2017-02-09 
* 更换锚点图标显示，更换为css样式。不然 pdf生成的时候会失败

#### v0.1.7 - 2017-02-09 
* css 命名重构
* 更换锚点图标显示，更换为github一致的svg图标
* 生成的目录增加到页面顶端，在某些情况下，会在页面底部来一个导航。很不美观，如：
  - 在gitbook首页的时候因为不会加载插件的css效果
  - 在生成pdf的时候，css没法被加载

#### 2017-02-08
* 重构项目结构

#### 2017-02-07
* 在源码中使用了 let 等es6的语法，在本地使用ok，在gitbook上报错：PluginError: Error with plugin "anchor-navigation-ex": Block-scoped declarations (let, const, function, class) not yet supported outside strict mode。不知道是为何，还是改成 var 来声明吧

#### 2017-02-06
* 完全重写代码
* 合并锚点和悬浮导航效果，现在只需要引入一个插件了 gitbook-plugin-anchor-navigation-ex

#### 2017-01-18
* 页面没有h[1-3] 标签生成失败

#### 2017-01-22
* 2017-01-18 提交的有问题。重新修复



### 致敬
本插件结合以下插件的功能，并直接重构他们的源码。

1. https://github.com/zhangzq/gitbook-plugin-navigator
2. https://github.com/yaneryou/gitbook-plugin-anchor-navigation
