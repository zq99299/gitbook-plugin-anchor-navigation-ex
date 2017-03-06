DOC：[中文](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/blob/master/README.md)，English

Math integration with GitBook

[![GitHub issues](https://img.shields.io/github/issues/zq99299/gitbook-plugin-anchor-navigation-ex.svg)](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/issues) [![GitHub issues](https://img.shields.io/github/issues-closed/zq99299/gitbook-plugin-anchor-navigation-ex.svg)](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/issues?q=is%3Aissue+is%3Aclosed) [![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/LICENSE) [![npm](https://img.shields.io/npm/v/gitbook-plugin-anchor-navigation-ex.svg)](https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex) [![npm](https://img.shields.io/npm/dt/gitbook-plugin-anchor-navigation-ex.svg)](https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex)


-----

### Plug-in effect
* style: minimalist
* Design sketch
  - Sample: https://zq99299.gitbooks.io/gitbook-guide/content/chapter/plugin.html
  - Night theme display
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/night主题展示.jpg)
  - Sepia theme display
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/sepia主题展示.jpg)
  - White theme display
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/white主题展示.jpg)    
  - The anchor effect and top display
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/锚点效果和top展示.jpg) 
  - TOC Title icon display
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/toc标题icon展示.jpg) 
  - TOC Title icon display
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/toc标题icon展示2.jpg) 
   - TOC title without icon show
   ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/toc标题无icon展示.jpg)      

### plug-in function:

1. add Toc to side navigation
2. can automatically extract the page title sort
3. default page title to all add anchor point effect
4. customizable TocIcon display and display icons
5. style follows the gitbook default theme style (the default theme style switches the plugin style also follows the switch)

### note:

1 this plugin will only extract h[1-3] tags as a floating navigation
2 nested only in the following order

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
If you override the page title, true (default): the title will be automatically rewritten in accordance with the current page title sequence, false: do not rewrite
For example:

```
源码标题为：
# 我是h1标题
## 我是h2标题
被重写之后：在页面看到的效果将是
1. 我是h1标题
1.1 我是h2标题
```
- **isShowTocTitleIcon :** 
Whether or not to display the false: icon in front of the suspended navigation TOC, true: shows that the display is not shown (default)
- **tocLevel1Icon :** 
Suspended navigation TOC title before the H1 icon style. Default is empty; example: for example: FA fa-address-book
- **tocLevel2Icon :** 
Suspended navigation TOC title before the H2 icon style. Default is empty; example: for example: FA fa-address-book
- **tocLevel3Icon :** 
Suspended navigation TOC title before the H3 icon style. Default is empty; example: for example: FA fa-address-book

#### Rewrite the course title and subject shows the relationship between the default level V0.3.+
If your configuration is as follows:
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
So the page title rewritten example is as follows:
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
The effect of final rendered on the page is as follows:
![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/标题重新与默认主题层级相关联.jpg)


#### on suspended navigation TOC title before icon style support
Floating navigation TOC icon icon before heading. Can be received worthy of: `http://fontawesome.dashgame.com/` bid out of the icon;
For example: FA fa-address-book

Theoretically support all CSS icons, the premise is to introduce css.

As the `http://fontawesome.dashgame.com/` CSS is the official theme of the reference. So you don't have to add it



### or Install locally

```
$ npm install gitbook-plugin-anchor-navigation-ex --save
```

>open npm : https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex


### Update record
#### v0.3.0 - 2017-03-06
- According to official level is associated with a page display [#4](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/pull/4)

#### v0.2.7 - 2017-03-01
- fix bug: Anchor link index unique [#6](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/pull/6)

#### v0.2.6 - 2017-03-01
- fix bug: [#5](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex/pull/5)

#### v0.2.5 - 2017-02-17
* to further optimize the suspension navigation style, and the official theme of the default to maintain the same, more beautiful, and unified style
* increase the suspension navigation TOC icon icon before the custom

#### v0.1.9 - 2017-02-17
Optimized navigation style

* reduce the shadow, slightly transparent panel background
* text display is 14 PX
* title number in bold
* adapt to the official default theme of the 3 sets. The navigation style will change with the style of the theme of the skin

#### v0.1.8 - 2017-02-09
* change the anchor icon display, the replacement for the CSS style. Otherwise, the PDF will fail to generate

#### v0.1.7 - 2017-02-09
* CSS named refactoring
* change the anchor icon display, the replacement for the GitHub consistent SVG Icon
* the generated directory is added to the top of the page and, in some cases, a navigation at the bottom of the page. Very unsightly, such as:
When the gitbook home page because it will not load the plug-in CSS effect
- CSS cannot be loaded while generating pdf

#### 2017-02-08
* rebuild project structure

#### 2017-02-07
* in the source code using the let and ES6 syntax, the use of OK in local, reported in gitbook: PluginError: Error with plugin "anchor-navigation-ex": Block-scoped declarations (let, const, function, class) not yet supported outside strict mode. Do not know why, or to VaR to declare it

#### 2017-02-06
* completely rewriting code
* with anchor and suspended navigation effect, now only need to introduce a plug-in gitbook-plugin-anchor-navigation-ex

#### 2017-01-18
* page without h[1-3] tag generation failed

#### 2017-01-22
* 2017-01-18 submitted a problem. Re repair



### salute
This plugin combines the features of the following plug-ins, and directly reconstructs their source code.

1. https://github.com/zhangzq/gitbook-plugin-navigator
2. https://github.com/yaneryou/gitbook-plugin-anchor-navigation
