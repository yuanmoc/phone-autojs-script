const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("pinduoduo");
const appOperator = require("../core/operator.js");
const { clickByText, clickByMatches, clickWidget, swipeLeft, swipeTop, closePopup, closeApp, getTextsUnderNode } = appOperator;


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
        if (clickByMatches(/.*继续来赚钱/)) {
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

    let content = getTextsUnderNode(text(_text).findOne(2000), 1)
    if(content.indexOf("去逛逛") === -1) {
        return;
    }

    if(clickByText(_text, 1, 9/10, 1/2, 5000)) {
        let startTime = new Date().getTime();
        while (new Date().getTime() - startTime < 66 * 1000) {
            sleep(config.baseDelay * 5);
            swipeTop();
        }
    }
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

function 复位到金币页面() {
    if (text("多多视频").exists()) {
        if (!clickByText("多多视频")) {
            back()
            sleep(1000)
            复位到金币页面()
        }
        sleep(1000)
        if (!clickByText("金币", 1, 1/2, 1/2, 1000)) {
            back()
            sleep(1000)
            复位到金币页面()
        }
    } else if (text("推荐").exists()) {
        clickByText("推荐")
        back()
        sleep(1000)
        复位到金币页面()
        sleep(1000)
    } else {
        back()
        sleep(1000)
        复位到金币页面()
    }
}


function runTask() {
    领取今日现金()
    去阅读()
    去逛逛("看商品视频得现金")
    去逛逛("看直播赚现金")
    去逛逛("看短剧领金币")
    去观看()
}

function bootRunTask() {
    // 1. 启动应用
    logger.log(`尝试启动${this.appName}`);
    if (!launchApp(this.appName)) {
        logger.log("启动应用失败");
        return;
    }
    sleep(5000)
    // 执行任务
    runTask();
    // 关闭应用
    closeApp(this.appName)
}


module.exports = {
    enabled: false,
    appName: "拼多多",    // 任务名称
    priority: 2,             // 优先级
    run: bootRunTask
}