const logger = require("../core/logger.js")("douyin");
const { clickByText, clickByOCR, clickWidget, swipeTop, swipeBottom, swipeLeft, scrollDownFindText,isDeviceCenter, findTextByOCR} = require("../core/operator");


function 签到() {
    _复位到赚钱页面()
    let _已连续签到 = scrollDownFindText(/已连续签到\d+天/)
    if (_已连续签到) {
        clickWidget(_已连续签到)
        sleep(2000)
        clickByOCR("签到领")
        sleep(1000)
        back()
    }
}


function 一键领金币() {
    _复位到赚钱页面()
    let 一键领金币 = findTextByOCR(/(预约领金币|键领金币)/)
    if (一键领金币) {
        clickWidget(一键领金币)
        sleep(1000)
        let _立即预约领取 = findTextByOCR("立即预约领取")
        if (_立即预约领取) {
            clickWidget(_立即预约领取)
            sleep(1000)
            clickByOCR("不用提醒我也能来")
            sleep(1000)
            _领取奖励()
            return
        }
        if (clickByText("立即领现金")) {
            if (clickByText("一键领取")) {
                sleep(1000)
                clickByText("开心收下")
                sleep(5000)
                clickByText("立即预约领取")
                back()
            }
        } else {
            if (clickByText("一键领取")) {
                sleep(1000)
                back()
            }
        }
    }
    _复位到赚钱页面()
    sleep(1000)
    一键领金币 = findTextByOCR(/(预约领金币|键领金币)/)
    if (一键领金币) {
        clickWidget(一键领金币)
        let _立即预约领取 = findTextByOCR("立即预约领取")
        if (_立即预约领取) {
            clickWidget(_立即预约领取)
            sleep(1000)
            clickByOCR("不用提醒我也能来")
            sleep(1000)
            _领取奖励()
        }
    }
}

function 打卡领华为手机() {
    _复位到赚钱页面()
    let _打卡领华为手机 = scrollDownFindText("打卡领华为手机", 8)
    if (_打卡领华为手机) {
        clickWidget(_打卡领华为手机)
        sleep(2000)
        clickByOCR("点击打卡")
        sleep(1000)
        back()
    }
}

function 吃饭打卡赚金币() {
    _复位到赚钱页面()
    let _吃饭打卡赚金币 = scrollDownFindText("吃饭打卡赚金币", 8)
    if (_吃饭打卡赚金币) {
        clickWidget(_吃饭打卡赚金币)
        sleep(2000)
        if (clickByOCR("看指定视频领")) {
            sleep(40* 1000)
            back()
            sleep(1000)
            _领取奖励()
        }
    }
    back()
    _关闭弹窗()
}

function 看广告赚金币() {
    _复位到赚钱页面()
    let _看广告赚金币 = scrollDownFindText("看广告赚金币", 8)
    if (_看广告赚金币) {
        clickWidget(_看广告赚金币)
        sleep(1000)
        if (!_设置获取广告时间()) {
            return;
        }
        back()
        sleep(1000)
        _领取奖励()
    }
    _关闭弹窗()
}

function 天天领金币() {
    _复位到赚钱页面()
    let _天天领金币 = scrollDownFindText("天天领金币", 8)
    if (_天天领金币) {
        clickWidget(_天天领金币)
        sleep(2000)
        clickByOCR("今日可领")
        sleep(1000)
        if (_设置获取广告时间()) {
            back()
            sleep(1000)
            clickByOCR("坚持退出")
        }
    }
}

function 看直播开宝箱() {
    _复位到赚钱页面()
    let _直播开宝箱 = scrollDownFindText("直播开宝箱", 8)
    if (_直播开宝箱) {
        clickWidget(_直播开宝箱)
        sleep(5000)
        if (text("立即打开").exists()) {
            clickByText("立即打开")
            back()
            sleep(1000)
        }
        if (text("开宝箱").exists()) {
            clickByText("开宝箱")
            back()
            sleep(1000)
        }
        if (id("live_daily_treasure").exists() && id("live_daily_treasure").findOne().visibleToUser()) {
            back()
            sleep(1000)
        }
        click(device.width / 2, device.height / 6);
        sleep(3000)
        let startTime = new Date().getTime();
        while (new Date().getTime() - startTime < 5 * 60 * 1000) {
            swipeTop();
            sleep(5000);
        }
    }
}

function 连续刷指定视频赚金币() {
    _复位到赚钱页面()
    let _连续刷指定视频赚金币 = scrollDownFindText("连续刷指定视频赚金币", 8)
    if (_连续刷指定视频赚金币) {
        clickWidget(_连续刷指定视频赚金币)
        let startTime = new Date().getTime();
        while (new Date().getTime() - startTime < 2 * 60 * 1000) {
            swipeTop();
            sleep(5000);
        }
        back()
        if (text("继续领金币").exists()) {
            clickByOCR("坚持退出")
            sleep(1000)
        }
    }
}

function 逛街赚钱() {
    _复位到赚钱页面()
    let _逛街赚钱 = scrollDownFindText("逛街赚钱", 8)
    if (_逛街赚钱) {
        clickWidget(_逛街赚钱)
        sleep(3000)
        let startTime = new Date().getTime();
        while (new Date().getTime() - startTime < 60 * 1000) {
            swipeTop();
            sleep(3000);
        }
        back()
        sleep(1000)
        _关闭弹窗()
    }
}

function 看短剧赚更多金币() {
    _复位到赚钱页面()
    let _看短剧赚更多金币 = scrollDownFindText("看短剧赚更多金币", 8)
    if (_看短剧赚更多金币) {
        clickWidget(_看短剧赚更多金币)
        sleep(5000)
        let startTime = new Date().getTime();
        while (new Date().getTime() - startTime < 5 * 60 * 1000) {
            swipeTop();
            sleep(5000);
        }
    }
}

function 睡前看小说赚金币() {
    _复位到赚钱页面()
    let _看小说赚金币 = scrollDownFindText("看小说赚金币", 8)
    if (_看小说赚金币) {
        clickWidget(_看小说赚金币)
        sleep(5000)
        if (text("签到领金币").exists()) {
            clickByText("签到领金币")
            sleep(3000)
        }
        if (text("明日再来").exists()) {
            clickByText("明日再来")
            sleep(3000)
        }
        if (clickByText("_Bq")) {
            sleep(3000)
            click(device.width / 2, device.height / 2)
            let startTime = new Date().getTime();
            while (new Date().getTime() - startTime < 5 * 60 * 1000) {
                swipeLeft();
                sleep(3000);
                // 有广告直接不执行下面的
                if (textContains("看广告免费解锁").exists()) {
                    back()
                    back()
                    return;
                }
            }
            back()
            back()
        }

    }
}

function 看爆款短剧加倍赚金币() {
    _复位到赚钱页面()
    let _看爆款短剧加倍赚金币 = scrollDownFindText("看爆款短剧加倍赚金币", 8)
    if (_看爆款短剧加倍赚金币) {
        clickWidget(_看爆款短剧加倍赚金币)
        sleep(5000)
        click(device.width / 2, device.height / 6)
        let startTime = new Date().getTime();
        while (new Date().getTime() - startTime < 5 * 60 * 1000) {
            swipeTop();
            sleep(3000);
        }
    }
}

function 周末送加倍赚() {
    _复位到赚钱页面()
    let _周末送加倍赚 = scrollDownFindText("周末送加倍赚", 8)
    if (_周末送加倍赚) {
        clickWidget(_周末送加倍赚)
        sleep(5000)
        if (text("立即打开").exists()) {
            clickByText("立即打开")
            back()
            sleep(1000)
        }
        if (text("开宝箱").exists()) {
            clickByText("开宝箱")
            back()
            sleep(1000)
        }
        if (id("live_daily_treasure").exists() && id("live_daily_treasure").findOne().visibleToUser()) {
            back()
            sleep(1000)
        }
        sleep(2000)
        let startTime = new Date().getTime();
        while (new Date().getTime() - startTime < 5 * 60 * 1000) {
            swipeTop();
            sleep(5000);
        }
    }

}

function _领取奖励() {
    let 领取奖励 = findTextByOCR("领取奖励")
    if (领取奖励 && isDeviceCenter(领取奖励)) {
        clickWidget(领取奖励)
        sleep(1000 * 2);
        _设置获取广告时间()
        back()
        sleep(1000 * 2)
        let count = 0;
        while (text("领取奖励").exists() && count < 2) {
            clickByText("领取奖励")
            _设置获取广告时间()
            back()
            sleep(1000 * 2)
            count++;
        }
        if (text("领取奖励").exists()) {
            clickByOCR("坚持退出")
        }
        _关闭弹窗()
    }
}

function _设置获取广告时间() {
    if(textMatches(/\d+秒后可领奖励.*/).exists()) {
        let content = textMatches(/\d+秒后可领奖励.*/).findOne().text()
        let sleep_time = content.match(/\d+/)[0];
        logger.log("sleep_time: "+ sleep_time)
        sleep(sleep_time * 1000)
        return true
    } else {
        return false
    }
}

function _关闭弹窗() {
    if (text("关闭").exists()) {
        clickByText("关闭")
        return
    }
    if (text("评价并收下金币").exists()) {
        clickByText("评价并收下金币")
        return
    }
    if (text("开心收下").exists()) {
        clickByText("开心收下")
        return
    }
    if (text("坚持退出").exists()) {
        clickByText("坚持退出")
        return
    }
}

function _复位到赚钱页面() {
    if (id('qsb').exists()) {
        id('qsb').click()
        sleep(1000)
    }
    if (id('root_view').exists()) {
        clickByText('root_view', {type: "id"})
        sleep(1000)
        let _签到提醒 = findTextByOCR("签到提醒")
        if (_签到提醒) {
            let _签到领 = findTextByOCR("签到领")
            if (_签到领 && isDeviceCenter(_签到领)) {
                clickWidget(_签到领)
                sleep(1000)
                back()
                sleep(1000)
            }
        }
        for (let i = 0; i < 6; i++) {
            swipeBottom();
        }
        sleep(1500);
    } else {
        back()
        sleep(1000)
        _复位到赚钱页面()
    }
}

module.exports = {
    enable: true,
    appName: "抖音极速版",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        签到,
        一键领金币, // 2927 金币
        打卡领华为手机,
        吃饭打卡赚金币, // 500 金币
        看广告赚金币,
        天天领金币,
        看直播开宝箱, //
        连续刷指定视频赚金币, // 35 金币
        逛街赚钱, // 598
        看短剧赚更多金币, //
        睡前看小说赚金币,
        // 看爆款短剧加倍赚金币,  // 需要付费开通才能看
        周末送加倍赚,
    ]
}