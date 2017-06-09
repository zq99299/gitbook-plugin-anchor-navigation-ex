# 插件功能定制，参数详解
本插件支持以下参数的配置：
```json
{
    showLevel: true,
    associatedWithSummary: true,
    mode: "float",
    float: {
        showLevelIcon: false,
        level1Icon: "fa fa-hand-o-right",
        level2Icon: "fa fa-hand-o-right",
        level3Icon: "fa fa-hand-o-right"
    },
    pageTop: {
        showLevelIcon: false,
        level1Icon: "fa fa-hand-o-right",
        level2Icon: "fa fa-hand-o-right",
        level3Icon: "fa fa-hand-o-right"
    }
}
```
## showLevel : TYPE:boolean。
    标题是否显示层级序号.页面标题和导航中的标题都会加上层级显示。

```
---- xx.md ---
# h1
## h2
### h3

显示层级后的页面效果如下：
1. h1
1.1. h2
1.1.1 h3
```
## associatedWithSummary : TYPE:boolean
    页面内的序号是否与 summary.md 中官方默认主题生成的序号相关联。
```
如果你打开了官网默认主题中的层级显示：
 "pluginsConfig": {
        "anchor-navigation-ex": {
           "associatedWithSummary":true
        },
        "theme-default": {
            "showLevel": true
        }
 }
 那么这样写：

 ----- SUMMARY.md ------
 # Summary

* [安装](chapter/install.md)
* [命令](chapter/command.md)
* [配置](chapter/bookjson.md)
* [插件](chapter/plugin.md)
    * [prismjs 代码高亮](chapter/plugin/prismjs.md)
    * [ace 代码高亮编辑](chapter/plugin/ace.md)
    * [navigator 页面导航](chapter/plugin/navigator.md)

 ----- chapter/redis/cluster.md ------
 # redis集群的准备
 ## zlib
 1. 安装redis-cluster依赖:redis-cluster的依赖库在使用时有兼容问题,在reshard时会遇到各种错误,请按指定版本安装.
 2. 确保系统安装zlib,否则gem install会报(no such file to load -- zlib)

 ...
```
那么最终效果如下：
  ![image](https://raw.githubusercontent.com/zq99299/gitbook-plugin-anchor-navigation-ex/master/doc/images/层级关联显示.png)

## mode
导航模式：分为三种

1. float ：浮动导航
2. pageTop ：页面内部顶部导航
3. '' : 不显示导航

## float
mode = float的时候以下配置生效
```
    float: { //浮动导航设置
        showLevelIcon: false,  //是否显示层级图标
        level1Icon: "fa fa-hand-o-right", //层级的图标css
        level2Icon: "fa fa-hand-o-right",
        level3Icon: "fa fa-hand-o-right"
    }
```
图标使用官网默认主题引入的css `http://fontawesome.dashgame.com/`

## pageTop
mode = pageTop的时候以下配置生效
```
pageTop: {
           showLevelIcon: false,
           level1Icon: "fa fa-hand-o-right",
           level2Icon: "fa fa-hand-o-right",
           level3Icon: "fa fa-hand-o-right"
       }
```

# 额外功能支持

- 在页面中增加`<extoc></extoc>`标签，会在此处生成TOC目录。
- 在页面中增加`<!-- ex_nonav -->`标识，会让此页面不生成悬浮导航

    在首页、介绍页等地方可以使用该功能，能屏蔽一些代码，因为这些地方不能加载css