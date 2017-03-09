var _start = require('./assets/lib/plugin');
var Config = require('./assets/lib/config');
module.exports = {
    book: {
        assets: "./assets",
        css: ["style/plugin.css"]
    },
    hooks: {
        "init": function () {
            Config.handlerAll(this);
        },
        "page": function (page) {
            var bookIns = this;
            _start(bookIns, page);
            return page;
        }
    }
};