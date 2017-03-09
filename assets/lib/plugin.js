var cheerio = require('cheerio');
var slug = require('github-slugid');
var Config = require('./config.js');


/**
 * 处理toc相关，同时处理标题和id
 * @param $
 * @param option
 * @param page
 * @returns {Array} 返回处理好的tocs合集
 */
function handlerTocs($, page) {
    var config = Config.config;
    var tocs = [];
    var count = {
        h1: 0,
        h2: 0,
        h3: 0
    }
    var h1 = 0, h2 = 0, h3 = 0;
    $(':header').each(function (i, elem) {
        var header = $(elem);
        var id = addId(header);

        // console.log('header = ' + header);
        if (id) {
            switch (elem.tagName) {
                case "h1":
                    handlerH1Toc(config, count, header, tocs, page.level);
                    break;
                case "h2":
                    handlerH2Toc(config, count, header, tocs, page.level);
                    break;
                case "h3":
                    handlerH3Toc(config, count, header, tocs, page.level);
                    break;
                default:
                    titleAddAnchor(config, header, id, header.text());
                    break;
            }
        }
    });
    return tocs;
}

/**
 * 处理锚点
 * @param header
 * @returns {*}
 */
function addId(header) {
    var id = header.attr('id');
    if (!id) {
        id = slug(header.text());
        header.attr("id", id);
    }
    return id;
}

/**
 * 标题增加锚点效果
 * @param option
 * @param id
 * @param title
 */
function titleAddAnchor(config, header, id, title) {
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
function handlerH1Toc(config, count, header, tocs, pageLevel) {
    var title = header.text();
    var id = header.attr('id');
    var level = ''; //层级
    var rewrite = title; //重写后的标题，用于页面直接替换

    count.h1 = count.h1 + 1;
    count.h2 = 0;
    count.h3 = 0;

    if (config.showLevel) {
        level = count.h1 + '. ';
        // 是否与官网默认主题层级序号相关联
        if (config.associatedWithSummary && config.themeDefault.showLevel) {
            level = pageLevel + '.' + level;
        }
        rewrite = level + title;
        id = slug(rewrite);
    } else {
        id = count.h1 + '-' + id
    }
    titleAddAnchor(config, header, id, rewrite);
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
function handlerH2Toc(config, count, header, tocs, pageLevel) {
    var title = header.text();
    var id = header.attr('id');
    var level = ''; //层级
    var rewrite = title; //重写后的标题，用于页面直接替换

    if (tocs.length <= 0) {
        titleAddAnchor(config, header, id, title);
        return;
    }

    count.h2 = count.h2 + 1;
    count.h3 = 0;

    var h1Index = tocs.length - 1;
    var h1Toc = tocs[h1Index];
    if (config.showLevel) {
        level = (count.h1 + '.' + count.h2 + '. ');
        if (config.associatedWithSummary && config.themeDefault.showLevel) {
            level = pageLevel + '.' + level;
        }
        rewrite = level + title;
        id = slug(rewrite);
    } else {
        id = count.h1 + '' + count.h2 + '-' + id;
    }
    titleAddAnchor(config, header, id, rewrite);
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
function handlerH3Toc(config, count, header, tocs, pageLevel) {
    var title = header.text();
    var id = header.attr('id');
    var level = ''; //层级
    var rewrite = title; //重写后的标题，用于页面直接替换

    if (tocs.length <= 0) {
        titleAddAnchor(config, header, id, title);
        return;
    }
    var h1Index = tocs.length - 1;
    var h1Toc = tocs[h1Index];
    var h2Tocs = h1Toc.children;
    if (h2Tocs.length <= 0) {
        titleAddAnchor(config, header, id, title);
        return;
    }
    var h2Toc = h1Toc.children[h2Tocs.length - 1];
    count.h3 = count.h3 + 1;

    if (config.showLevel) {
        level = (count.h1 + '.' + count.h2 + '.' + count.h3 + '. ');
        if (config.associatedWithSummary && config.themeDefault.showLevel) {
            level = pageLevel + "." + level;
        }
        rewrite = level + title;
        id = slug(rewrite);
    } else {
        id = count.h1 + '' + count.h2 + count.h3 + '-' + id;
    }
    titleAddAnchor(config, header, id, rewrite);
    h2Toc.children.push({
        name: title,
        level: level,
        url: id,
        children: []
    });
}

/**
 * 处理浮动导航：拼接锚点导航html，并添加到html末尾，利用css 悬浮
 * @param option
 * @param tocs
 * @param page
 */
function handlerFloatNavbar($, tocs, page) {
    var config = Config.config;
    var float = config.float;
    var level1Icon = '';
    var level2Icon = '';
    var level3Icon = '';
    if (float.showLevelIcon) {
        level1Icon = float.level1Icon;
        level2Icon = float.level2Icon;
        level3Icon = float.level3Icon;
    }

    var html = "<div id='anchor-navigation-ex-navbar'><i class='fa fa-anchor'></i><ul>";
    for (var i = 0; i < tocs.length; i++) {
        var h1Toc = tocs[i];
        html += "<li><span class='title-icon " + level1Icon + "'></span><a href='#" + h1Toc.url + "'><b>" + h1Toc.level + "</b>" + h1Toc.name + "</a></li>";
        if (h1Toc.children.length > 0) {
            html += "<ul>"
            for (var j = 0; j < h1Toc.children.length; j++) {
                var h2Toc = h1Toc.children[j];
                html += "<li><span class='title-icon " + level2Icon + "'></span><a href='#" + h2Toc.url + "'><b>" + h2Toc.level + "</b>" + h2Toc.name + "</a></li>";
                if (h2Toc.children.length > 0) {
                    html += "<ul>";
                    for (var k = 0; k < h2Toc.children.length; k++) {
                        var h3Toc = h2Toc.children[k];
                        html += "<li><span class='title-icon " + level3Icon + "'></span><a href='#" + h3Toc.url + "'><b>" + h3Toc.level + "</b>" + h3Toc.name + "</a></li>";
                    }
                    html += "</ul>";
                }
            }
            html += "</ul>"
        }
    }

    html += "</ul></div><a href='#" + tocs[0].url + "' id='anchorNavigationExGoTop'><i class='fa fa-arrow-up'></i></a>";

    page.content = html + $.html();
}

function handlerPageTopNavbar($, tocs, page) {
    var config = Config.config;
    var pageTop = config.pageTop;
    var level1Icon = '';
    var level2Icon = '';
    var level3Icon = '';
    if (pageTop.showLevelIcon) {
        level1Icon = pageTop.level1Icon;
        level2Icon = pageTop.level2Icon;
        level3Icon = pageTop.level3Icon;
    }

    var html = "<div id='anchor-navigation-ex-pagetop-navbar'><ul>";
    for (var i = 0; i < tocs.length; i++) {
        var h1Toc = tocs[i];
        html += "<li><span class='title-icon " + level1Icon + "'></span><a href='#" + h1Toc.url + "'><b>" + h1Toc.level + "</b>" + h1Toc.name + "</a></li>";
        if (h1Toc.children.length > 0) {
            html += "<ul>"
            for (var j = 0; j < h1Toc.children.length; j++) {
                var h2Toc = h1Toc.children[j];
                html += "<li><span class='title-icon " + level2Icon + "'></span><a href='#" + h2Toc.url + "'><b>" + h2Toc.level + "</b>" + h2Toc.name + "</a></li>";
                if (h2Toc.children.length > 0) {
                    html += "<ul>";
                    for (var k = 0; k < h2Toc.children.length; k++) {
                        var h3Toc = h2Toc.children[k];
                        html += "<li><span class='title-icon " + level3Icon + "'></span><a href='#" + h3Toc.url + "'><b>" + h3Toc.level + "</b>" + h3Toc.name + "</a></li>";
                    }
                    html += "</ul>";
                }
            }
            html += "</ul>"
        }
    }

    html += "</ul></div>";

    page.content = html + $.html();
}

function start(bookIns, page) {
    var $ = cheerio.load(page.content);
    // 处理toc相关，同时处理标题和id
    var tocs = handlerTocs($, page);

    // 设置处理之后的内容
    if (tocs.length == 0) {
        page.content = $.html();
        return;
    }
    var config = Config.config;
    var mode = config.mode;
    if (mode == 'float') {
        handlerFloatNavbar($, tocs, page);
    } else if (mode = 'pageTop') {
        handlerPageTopNavbar($, tocs, page);
    }
}

module.exports = start;
