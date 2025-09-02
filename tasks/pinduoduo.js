const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("pinduoduo");
const appOperator = require("../core/operator.js");
const { clickByText, clickWidget, swipeLeft, swipeTop, closePopup, getNodeText } = appOperator;


function 领取今日现金() {
    if (text("领取今日现金").exists()) {
        if (clickByText("领取今日现金")) {
            sleep(config.baseDelay * 2);
            closePopup();
            sleep(config.baseDelay * 2);
        }
    }
}

function 关闭继续来赚钱弹窗() {
    if (textMatches(/.*继续来赚钱/).exists()) {
        if (clickByText(/.*继续来赚钱/)) {
            sleep(config.baseDelay * 2);
        }
    }
}

function 去阅读() {
    关闭继续来赚钱弹窗()
    复位到金币页面()
    sleep(1000)
    if (!clickByText("去阅读")) {
        return;
    }
    sleep(config.baseDelay * 2);
    let books = className('android.support.v7.widget.RecyclerView').findOne(100);
    clickWidget(books)
    sleep(config.baseDelay * 5);
    let startTime = new Date().getTime();
    while (new Date().getTime() - startTime < 2 * 60 * 1000) {
        swipeLeft();
        sleep(config.baseDelay * 5);
    }
    back()
    back()
    关闭继续来赚钱弹窗()
}

function 去逛逛(_text) {
    关闭继续来赚钱弹窗()
    复位到金币页面()
    sleep(1000)

    let content = getNodeText(text(_text).findOne(2000), 1)
    if(content.indexOf("去逛逛") === -1) {
        return;
    }

    if(clickByText(_text, {parentLevel:1, offsetXRatio:9/10, timeout: 5000})) {
        let startTime = new Date().getTime();
        while (new Date().getTime() - startTime < 66 * 1000) {
            sleep(config.baseDelay * 5);
            swipeTop();
        }
    }
}

function 看商品视频得现金() {
    去逛逛("看商品视频得现金")
}
function 看直播赚现金() {
    去逛逛("看直播赚现金")
}
function 看短剧领金币() {
    去逛逛("看短剧领金币")
}

function 去观看() {
    关闭继续来赚钱弹窗()
    复位到金币页面()
    sleep(1000)
    if (!clickByText("去观看")) {
        return;
    }
    sleep(config.baseDelay * 2);
    let startTime = new Date().getTime();
    while (new Date().getTime() - startTime < 66 * 1000) {
        sleep(config.baseDelay * 5);
        swipeTop();
    }
    back()
}

function 去领取() {
    关闭继续来赚钱弹窗()
    复位到金币页面()
    if (text("去领取").exists()) {
        if (clickByText("去领取")) {
            sleep(config.baseDelay * 2);
            clickByText(/喝水打卡领\d+金币/)
            sleep(config.baseDelay * 2);
            let startTime = new Date().getTime();
            while (new Date().getTime() - startTime < 2 * 62 * 1000) {
                sleep(config.baseDelay * 5);
                swipeTop();
            }
            back()
        }
    }
}

function 复位到金币页面() {
    if (text("我的金币").exists() && text("我的现金").exists()) {
        return;
    }
    if (text("多多视频").exists()) {
        if (!clickByText("多多视频")) {
            back()
            sleep(1000)
            复位到金币页面()
            return;
        }
        sleep(1000)
        if (!clickByText("金币", {parentLevel: 1, timeout:1000})) {
            back()
            sleep(1000)
            复位到金币页面()
            return;
        }
    } else if (text("推荐").exists()) {
        clickByText("推荐")
        back()
        sleep(1000)
        复位到金币页面()
        sleep(1000)
        return;
    } else {
        back()
        sleep(1000)
        复位到金币页面()
        return;
    }
}


module.exports = {
    appName: "拼多多",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        领取今日现金,
        去阅读,
        看商品视频得现金,
        看直播赚现金,
        看短剧领金币,
        去观看,
        去领取,
    ]
}