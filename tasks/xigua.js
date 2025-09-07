const logger = require("../core/logger.js")("xigua");
const { findTextByOCR, clickByText, swipeTop, isDeviceCenter, closePopup, scrollDownFindText, clickByOCR, clickWidget} = require("../core/operator");

function 签到() {
    _重置到首页()
    let _连续签到 = scrollDownFindText("连续签到")
    if (_连续签到) {
        clickWidget(_连续签到)
        sleep(1000 * 2);
        _立即签到操作()
        sleep(1000 * 2)
        _看广告再赚()

        // 打开日历提醒
        let _打开日历提醒 = findTextByOCR("打开日历提醒")
        if (_打开日历提醒 && isDeviceCenter(_打开日历提醒)) {
            back()
        }
    }
}

function 预约领金币() {
    _重置到首页()
    let _一键领金币 = scrollDownFindText("一键领金币")
    if (_一键领金币) {
        clickWidget(_一键领金币)
        sleep(1000 * 2);
        let 一键领取 = findTextByOCR("一键领取")
        if (一键领取) {
            clickWidget(一键领取)
            sleep(1000 * 2);
            clickByOCR("开心收下")
            sleep(1000 * 2);
            clickByText("立即预约领取", {type: "text"})
            sleep(1000 * 2);
            clickByText("不用提醒我也能来", {type: "text"})
            sleep(1000)
            _领取奖励()
        }
    }

    _重置到首页()
    let _预约领金币 = scrollDownFindText("预约领金币")
    if (_预约领金币) {
        clickWidget(_预约领金币)
        sleep(1000 * 2);
        clickByText("立即预约领取", {type: "text"})
        sleep(1000);
        back()
        sleep(1000)
        clickByText("不用提醒我也能来", {type: "text"})
        sleep(1000)
        _领取奖励()
        sleep(1000)
        back()
    }
}

function 新人看视频赚大额() {
    _重置到首页()
    let _新人看视频赚大额 = scrollDownFindText("新人看视频赚大额")
    if (_新人看视频赚大额) {
        clickWidget(_新人看视频赚大额)
        sleep(1000 * 2);
        // 开心收下
        let _开心收下 = findTextByOCR("开心收下")
        if (_开心收下 && isDeviceCenter(_开心收下)) {
            _看广告再赚()
            sleep(1000 * 2);
            新人看视频赚大额()
        }
        // 看视频
        let startTime = new Date().getTime();
        let duration = 5 * 60 * 1000; // 5分钟
        while (new Date().getTime() - startTime < duration) {
            swipeTop()
            sleep(1000 * 5)
            logger.log("观看时间: " + (new Date().getTime() - startTime)/1000+"s")
        }
    }
}

function 赚更多海量金币() {
    _重置到首页()
    let _赚更多海量金币 = scrollDownFindText("赚更多海量金币")
    if (_赚更多海量金币) {
        clickWidget(_赚更多海量金币)
        sleep(1000 * 2);
        if (!_设置获取广告时间()) {
            // 没有进行视频页面
            return ;
        }
        back()
        sleep(1000 * 2)
        _领取奖励()
    }
}

function 内流看短剧增发金币() {
    _重置到首页()
    let _内流看短剧增发金币 = scrollDownFindText("内流看短剧增发金币")
    if (_内流看短剧增发金币) {
        clickWidget(_内流看短剧增发金币)
        sleep(1000 * 2);
        // 开心收下
        let _开心收下 = findTextByOCR("开心收下")
        if (_开心收下 && isDeviceCenter(_开心收下)) {
            _看广告再赚()
            sleep(1000 * 2);
            内流看短剧增发金币()
        }

        let startTime = new Date().getTime();
        let duration = 5 * 60 * 1000; // 5分钟
        while (new Date().getTime() - startTime < duration) {
            swipeTop()
            sleep(1000 * 5);
            logger.log("观看时间: " + (new Date().getTime() - startTime)/1000+"s")
        }

    }
}

function _立即签到操作() {
    let 立即签到 = findTextByOCR("立即签到")
    if (立即签到 && isDeviceCenter(立即签到)) {
        clickWidget(立即签到)
        sleep(1000 * 2);
        _看广告再赚()
    }
}

function _看广告再赚() {
    let 看广告 = findTextByOCR("看广告")
    if (看广告 && isDeviceCenter(看广告)) {
        clickWidget(看广告)
        sleep(1000 * 2);
        if (!_设置获取广告时间()) {
            return;
        }
        back()
        sleep(1000 * 2)
        _领取奖励()
    }
}

function _看视频赚(minutes = 5) {
    let 看视频赚 = findTextByOCR(/看视频赚\d+/)
    if (看视频赚 && isDeviceCenter(看视频赚)) {
        clickWidget(看视频赚)
        let startTime = new Date().getTime();
        let duration = minutes * 60 * 1000; // 5分钟
        while (new Date().getTime() - startTime < duration) {
            swipeTop()
            sleep(1000 * 5);
            logger.log("观看时间: " + (new Date().getTime() - startTime)/1000+"s")
        }
    }
}

function _领取奖励() {
    let retryCount = 0;
    let maxRetries = 2;
    while (text("领取奖励").exists() && retryCount < maxRetries) {
        clickByOCR("领取奖励");
        sleep(1000 * 2);
        if(!_设置获取广告时间()) {
            return;
        }
        back();
        sleep(1000 * 2);
        retryCount++;
    }
    clickByOCR("坚持退出")
    sleep(1000);
    _关闭弹窗()
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
    sleep(2000)
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
            _看视频赚(1)
        }
    } else {
        back()
        sleep(1000)
        if (text("坚持退出").exists()) {
            clickByOCR("坚持退出")
            sleep(2000)
        }
        _重置到首页()
    }
}


module.exports = {
    appName: "西瓜视频",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        签到,
        新人看视频赚大额,
        预约领金币,
        赚更多海量金币,
        内流看短剧增发金币
    ]
}