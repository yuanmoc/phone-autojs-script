const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("zhifubao");
const appOperator = require("../core/operator.js");
const { clickByText, clickWidget, swipeTop, getTextsUnderNode, closePopup,closeApp } = appOperator;

function 去签到() {
    复位到视频红包页面()
    if (text("去签到").exists()) {
        if(clickByText("去签到")) {
            sleep(config.baseDelay * 2);
            clickByText("scroll_to_signIn")
            sleep(config.baseDelay * 2);
            closePopup()
        }
    }
}

function 去领取去预约() {
    复位到视频红包页面()
    if (clickByText("去领取")) {
        sleep(config.baseDelay * 2);
        clickByText("去预约")
        sleep(config.baseDelay * 2);
    }
}


function 浏览广告领红包() {
    复位到视频红包页面()
    let list = text("去看看").find(2000);
    for (let i = 0; i < list.length; i++) {
        let content = getTextsUnderNode(list[i], 2)
        if (content.indexOf("浏览广告领红包") === -1) {
            continue;
        }
        clickWidget(list[i])
        for (let i = 0; i < 50; i++) {
            sleep(6 * 1000);
            if (text('已领完').exists()) {
                return;
            }
            swipeTop();
            sleep(6 * 1000); // 浏览12秒
        }
    }
}

function 去看看() {
    for (let j = 0; j < 8; j++) {
        复位到视频红包页面()
        立即领取()
        sleep(1000)
        let list = text("去看看").find(2000);
        for (let i = 0; i < list.length; i++) {
            let content = getTextsUnderNode(list[i], 2)
            if (content.indexOf("浏览广告领红包") !== -1) {
                sleep(1000)
                continue;
            }
            clickWidget(list[i]);
            sleep(12 * 1000); // 浏览5秒返回
            break
        }
    }
}

function 立即领取() {
    if (text("立即领取").exists()) {
        clickByText("立即领取")
        sleep(config.baseDelay * 2);
    }
}

function 刷视频() {
    复位到视频页面()
    sleep(1000)
    const startTime = new Date().getTime();
    const duration = 10 * 60 * 1000; // 5分钟的毫秒数

    while (new Date().getTime() - startTime < duration) {
        swipeTop();
        sleep(config.baseDelay * 10);
    }
}

function 复位到视频页面() {
    if (text("发现").exists()) {
        clickByText("发现")
        sleep(2 * 1000)
        return;
    }
    if(text("视频").exists()) {
        clickByText("视频")
        sleep(2 * 1000)
    } else if (text("消息").exists()) {
        // tabs点击中间
        clickByText("tabs")
        sleep(2 * 1000)
    } else {
        back()
        sleep(1000)
        复位到视频页面()
    }
}

function 复位到视频红包页面() {
    if (text("使用红包").exists()) {
        return;
    }
    复位到视频页面()
    sleep(1000)
    clickByText('suspendLayout')
    sleep(8000)
}

module.exports = {
    appName: "支付宝",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        去领取去预约,
        去签到,
        去看看,
        浏览广告领红包,
        刷视频,
    ]
}