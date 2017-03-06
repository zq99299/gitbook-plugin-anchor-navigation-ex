var cheerio = require('cheerio');
var slug = require('github-slugid');

/**
 * 处理默认参数
 * @param defaultOption
 * @param configOption
 */
function handlerOption(defaultOption, configOption) {
    if (configOption) {
        for (var item in defaultOption) {
            if (item in configOption) {
                defaultOption[item] = configOption[item];
            }
        }
    }
}
/**
 * 处理默认主题的层级配置
 * @param defaultConfig
 * @param themeDefaultConfig
 */
function handlerThemeDefaultConfig(defaultConfig, themeDefaultConfig) {
    if (themeDefaultConfig) {
        handlerOption(defaultConfig.themeDefault, themeDefaultConfig);
    }
}

/**
 * 处理toc相关，同时处理标题和id
 * @param $
 * @param option
 * @param page
 * @returns {Array} 返回处理好的tocs合集
 */
function handlerTocs($, option, page) {
    var tocs = [];
    var count = {
        h1: 0,
        h2: 0,
        h3: 0
    }
    var h1 = 0, h2 = 0, h3 = 0;
    $(':header').each(function (i, elem) {
        var header = $(elem);
        var id = header.attr('id');
        if (!id) {
            id = slug(header.text());
            header.attr("id", id);
        }

        // console.log('header = ' + header);
        if (id) {
            switch (elem.tagName) {
                case "h1":
                    handlerH1Toc(option, count, header, tocs, page.level);
                    break;
                case "h2":
                    handlerH2Toc(option, count, header, tocs, page.level);
                    break;
                case "h3":
                    handlerH3Toc(option, count, header, tocs, page.level);
                    break;
                default:
                    handlerTitle(option, header, id, header.text());
                    break;
            }
        }
    });
    return tocs;
}

/**
 * 辅助处理标题，默认增加锚点效果
 * @param option
 * @param id
 * @param title
 */
function handlerTitle(option, header, id, title) {
    header.text(title);
    header.attr('id', id);
    header.prepend('<a name="' + id + '" class="anchor-navigation-ex-anchor" '
        + 'href="#' + id + '">'
        + '<i class="fa fa-link" aria-hidden="true"></i>'
        + '</a>');
}

/**
 * 处理h1
 * @param count 计数器
 * @param header
 * @param tocs 根节点
 */
function handlerH1Toc(option, count, header, tocs, pageLevel) {
    var title = header.text();
    var id = header.attr('id');
    var level = null; //层级
    var rewrite = title; // 重写以后的标题
    count.h1 = count.h1 + 1;
    count.h2 = 0;
    count.h3 = 0;

    if (option.isRewritePageTitle) {
        level = count.h1 + ". ";
        if (option.themeDefault.showLevel) {
            level = pageLevel + "." + level;
        }
        rewrite = level + title;
        id = slug(rewrite);
    } else {
        id = count.h1 + "-" + id
    }
    handlerTitle(option, header, id, rewrite);
    tocs.push({
        name: title,
        level: level,
        url: id,
        children: []
    });
}
/**
 * 处理h2
 * @param count 计数器
 * @param header
 */
function handlerH2Toc(option, count, header, tocs, pageLevel) {
    var title = header.text();
    var id = header.attr('id');
    var level = null; //层级
    var rewrite = title; // 重写以后的标题

    if (tocs.length <= 0) {
        handlerTitle(option, header, id, title);
        return;
    }
    var h1Index = tocs.length - 1;
    var h1Toc = tocs[h1Index];
    count.h2 = count.h2 + 1;
    count.h3 = 0;
    if (option.isRewritePageTitle) {
        level = (count.h1 + '.' + count.h2 + ". ");
        if (option.themeDefault.showLevel) {
            level = pageLevel + "." + level;
        }
        rewrite = level + title;
        id = slug(rewrite);
    } else {
        id = count.h1 + "" + count.h2 + "-" + id
    }
    handlerTitle(option, header, id, rewrite);
    h1Toc.children.push({
        name: title,
        level: level,
        url: id,
        children: []
    });
}
/**
 * 处理h3
 * @param count 计数器
 * @param header
 */
function handlerH3Toc(option, count, header, tocs, pageLevel) {
    var title = header.text();
    var id = header.attr('id');
    var level = null; //层级
    var rewrite = title; // 重写以后的标题

    if (tocs.length <= 0) {
        handlerTitle(option, header, id, title);
        return;
    }
    var h1Index = tocs.length - 1;
    var h1Toc = tocs[h1Index];
    var h2Tocs = h1Toc.children;
    if (h2Tocs.length <= 0) {
        handlerTitle(option, header, id, title);
        return;
    }
    var h2Toc = h1Toc.children[h2Tocs.length - 1];
    count.h3 = count.h3 + 1;
    if (option.isRewritePageTitle) {
        level = (count.h1 + "." + count.h2 + "." + count.h3 + ". ");
        if (option.themeDefault.showLevel) {
            level = pageLevel + "." + level;
        }
        rewrite = level + title;
        id = slug(rewrite);
    } else {
        id = count.h1 + "" + count.h2 + count.h3 + "-" + id
    }
    handlerTitle(option, header, id, rewrite);
    h2Toc.children.push({
        name: title,
        level: level,
        url: id,
        children: []
    });
}

/**
 * 拼接锚点导航html，并添加到html末尾，利用css 悬浮
 * @param option
 * @param tocs
 * @param section
 */
function handlerAnchorsNavbar($, option, tocs, section) {
    var html = "<div id='anchor-navigation-ex-navbar'><i class='fa fa-anchor'></i><ul>";
    if (tocs.length <= 0) {
        return;
    }
    var tocLevel1Icon = option.tocLevel1Icon;
    var tocLevel2Icon = option.tocLevel2Icon;
    var tocLevel3Icon = option.tocLevel3Icon;
    if (!option.isShowTocTitleIcon) {
        tocLevel1Icon = "";
        tocLevel2Icon = "";
        tocLevel3Icon = "";
    }
    for (var i = 0; i < tocs.length; i++) {
        var h1Toc = tocs[i];
        html += "<li><span class='title-icon " + tocLevel1Icon + "'></span><a href='#" + h1Toc.url + "'><b>" + (h1Toc.level || "") + "</b>" + h1Toc.name + "</a></li>";
        if (h1Toc.children.length > 0) {
            html += "<ul>"
            for (var j = 0; j < h1Toc.children.length; j++) {
                var h2Toc = h1Toc.children[j];
                html += "<li><span class='title-icon " + tocLevel2Icon + "'></span><a href='#" + h2Toc.url + "'><b>" + (h2Toc.level || "") + "</b>" + h2Toc.name + "</a></li>";
                if (h2Toc.children.length > 0) {
                    html += "<ul>";
                    for (var k = 0; k < h2Toc.children.length; k++) {
                        var h3Toc = h2Toc.children[k];
                        html += "<li><span class='title-icon " + tocLevel3Icon + "'></span><a href='#" + h3Toc.url + "'><b>" + (h3Toc.level || "") + "</b>" + h3Toc.name + "</a></li>";
                    }
                    html += "</ul>";
                }
            }
            html += "</ul>"
        }
    }

    html += "</ul></div><a href='#" + tocs[0].url + "' id='anchorNavigationExGoTop'><i class='fa fa-arrow-up'></i></a>";

    section.content = html + $.html();
}

function start(bookIns, page) {
    const defaultOption = {
        //是否重写页面标题，true:将会覆盖anchors插件锚点效果
        isRewritePageTitle: true,
        //是否显示toc 标题前面的icon
        isShowTocTitleIcon: false,
        tocLevel1Icon: "fa fa-hand-o-right",
        tocLevel2Icon: "fa fa-hand-o-right",
        tocLevel3Icon: "fa fa-hand-o-right",
        themeDefault: {
            showLevel: false
        }
    }
    /**
     * [configOption: config option]
     * @type {Object}
     */
    var configOption = bookIns.config.get('pluginsConfig')['anchor-navigation-ex'];
    var themeDefaultConfig = bookIns.config.get('pluginsConfig')['theme-default'];
    // 处理配置参数
    handlerOption(defaultOption, configOption);
    handlerThemeDefaultConfig(defaultOption, themeDefaultConfig);

    var $ = cheerio.load(page.content);
    // 处理toc相关，同时处理标题和id
    var tocs = handlerTocs($, defaultOption, page);
    // 设置处理之后的内容
    if (tocs.length == 0) {
        page.content = $.html();
        return page;
    }
    //拼接锚点导航html，并添加到html末尾，利用css 悬浮
    handlerAnchorsNavbar($, defaultOption, tocs, page);
}

module.exports = start;
