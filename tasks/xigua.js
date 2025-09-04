const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("template");
const { findTextByOCR, clickByText, swipeTop, isDeviceCenter, clickWidget, closePopup, scrollDownFindText} = require("../core/operator");

function 预约领金币() {
    _重置到首页()
    let _预约领金币 = scrollDownFindText("预约领金币")
    if (_预约领金币) {
        clickWidget(_预约领金币)
        sleep(config.baseDelay * 2);
        clickByText("立即预约领取", {type: "text"})
        sleep(config.baseDelay);
        back()
        sleep(config.baseDelay)
        clickByText("不用提醒我也能来", {type: "text"})
        sleep(config.baseDelay)
        _领取奖励()
        sleep(config.baseDelay)
        back()
    }
}

function 赚更多海量金币() {
    _重置到首页()
    let _赚更多海量金币 = scrollDownFindText("赚更多海量金币")
    if (_赚更多海量金币) {
        clickWidget(_赚更多海量金币)
        sleep(config.baseDelay * 2);
        if (!_设置获取广告时间()) {
            // 没有进行视频页面
            return ;
        }
        back()
        sleep(config.baseDelay * 2)
        _领取奖励()
    }
}

function _立即签到操作() {
    let 立即签到 = findTextByOCR("立即签到")
    if (立即签到 && isDeviceCenter(立即签到)) {
        clickWidget(立即签到)
        sleep(config.baseDelay * 2);
        _看广告再赚()
    }
}

function _看广告再赚() {
    let 看广告 = findTextByOCR("看广告")
    if (看广告 && isDeviceCenter(看广告)) {
        clickWidget(看广告)
        sleep(config.baseDelay * 2);
        _设置获取广告时间()
        back()
        sleep(config.baseDelay * 2)
        _领取奖励()
    }
}

function _领取奖励() {
    let retryCount = 0;
    let maxRetries = 3;
    while (text("领取奖励").exists() && retryCount < maxRetries) {
        clickByText("领取奖励");
        _设置获取广告时间();
        back();
        sleep(config.baseDelay * 2);
        retryCount++;
    }
    clickByText("坚持退出")
    sleep(config.baseDelay);
    _关闭弹窗()
}

function _看视频赚金币() {
    let 看视频赚 = findTextByOCR("看视频赚")
    if (看视频赚 && isDeviceCenter(看视频赚)) {
        clickWidget(看视频赚)
        let startTime = new Date().getTime()
        let duration = 5 * 60 * 1000  // 5分钟
        while (new Date().getTime() - startTime < duration) {
            swipeTop()
            sleep(5000)
        }
    }
}

function _关闭弹窗() {
    let 立即提现 = findTextByOCR("立即提现")
    if (立即提现 && isDeviceCenter(立即提现)) {
        closePopup()
    }
    let 评价并关闭 = findTextByOCR("评价并关闭")
    if (评价并关闭 && isDeviceCenter(评价并关闭)) {
        clickWidget(评价并关闭)
    }
    _立即签到操作()
}

function _设置获取广告时间() {
    if(textMatches(/\d+秒后可领奖励.*/).exists()) {
        let content = textMatches(/\d+秒后可领奖励.*/).findOne().text()
        let sleep_time = content.match(/\d+/)[0];
        logger.log("sleep_time: "+ sleep_time)
        sleep(sleep_time * 1000)
        return true
    }
    return false
}

function _重置到首页() {
    if (desc("我的 标签").exists()) {
        if (clickByText("我的 标签", {type: "desc"})) {
            clickByText("现金", {type: "text"})
            sleep(2000)
        }
    } else {
        back()
        sleep(1000)
        _重置到首页()
    }
}


module.exports = {
    appName: "西瓜视频",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        预约领金币,
        赚更多海量金币
    ]
}