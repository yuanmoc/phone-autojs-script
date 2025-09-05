const logger = require("../core/logger.js")("douyin");
const { clickByText, clickByOCR, clickWidget, swipeTop, swipeBottom, swipeLeft, scrollDownFindText } = require("../core/operator.js");


function 签到() {
    复位到赚钱页面()
    let _已连续签到 = scrollDownFindText(/已连续签到\d+天/)
    if (_已连续签到) {
        clickWidget(_已连续签到)
        sleep(2000)
        clickByOCR("签到领")
        sleep(1000)
        back()
    }
}

function 回归现金福利() {
    复位到赚钱页面()
    if (clickByText("立即领现金", { parentLevel: 1 })) {
        sleep(1000)
    }
}

function 一键领金币() {
    复位到赚钱页面()
    if (clickByOCR("一键领金币")) {
        sleep(1000)
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
    sleep(1000)
    clickByOCR("预约领金币")
    sleep(1000)
}

function 打卡领华为手机() {
    复位到赚钱页面()
    if (!scrollDownFindText("打卡领华为手机", 8)) {
        return
    }
    if (clickByOCR("打卡领华为手机")) {
        sleep(2000)
        clickByOCR("点击打卡")
        sleep(1000)
        back()
    }
}

function 吃饭打卡赚金币() {
    复位到赚钱页面()
    if (!scrollDownFindText("吃饭打卡赚金币", 8)) {
        return
    }
    if (clickByOCR("吃饭打卡赚金币")) {
        sleep(2000)
        if (clickByOCR("看指定视频领")) {
            sleep(40* 1000)
            back()
            sleep(1000)
            while (clickByText("领取奖励")) {
                sleep(40* 1000)
                back()
                sleep(1000)
            }
        }
    }
    back()
    关闭弹窗()
}

function 看广告赚金币() {
    复位到赚钱页面()
    if (!scrollDownFindText(/(看广告賺金币|看广告赚金币)/, 8)) {
        return;
    }
    if (clickByOCR(/(看广告賺金币|看广告赚金币)/)) {
        sleep(1000)
        if (!设置获取广告时间()) {
            return;
        }
        back()
        back()
        sleep(1000)
        while (clickByText("领取奖励")) {
            sleep(1000)
            if (!设置获取广告时间()) {
                return;
            }
            if (!textContains("领取成功")) {
                back()
            }
            back()
            back()
            sleep(1000)
        }
    }
    关闭弹窗()
}

function 天天领金币() {
    复位到赚钱页面()
    if (!scrollDownFindText("天天领金币", 8)) {
        return;
    }
    if (clickByOCR("天天领金币")) {
        sleep(3000)
        clickByOCR("今日可领")
        sleep(1000)
        back()
    }
}

function 看直播开宝箱() {
    复位到赚钱页面()
    if (!scrollDownFindText("直播开宝箱", 8)) {
        return;
    }
    if (clickByOCR("直播开宝箱")) {
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
        sleep(5000)
        for (let i = 0; i < 50; i++) {
            swipeTop()
            sleep(5000)
        }
    }
}

function 连续刷指定视频赚金币() {
    复位到赚钱页面()
    if (!scrollDownFindText("连续刷指定视频赚金币", 8)) {
        return;
    }
    if (clickByOCR("连续刷指定视频赚金币")) {
        let startTime = new Date().getTime();
        while (new Date().getTime() - startTime < 2 * 60 * 1000) {
            swipeTop();
            sleep(5000);
        }
        back()
        let count = 0;
        while (clickByText("继续领金币") && count < 10) {
            while (new Date().getTime() - startTime < 35 * 1000) {
                swipeTop();
                sleep(5000);
            }
            back()
            sleep(1000)
            count++;
        }
    }
}

function 逛街賺钱() {
    复位到赚钱页面()
    if (!scrollDownFindText("逛街賺钱", 8)) {
        return;
    }
    if (clickByOCR("逛街賺钱")) {
        sleep(3000)
        for (let i = 0; i < 60; i++) {
            swipeTop()
            sleep(1500)
        }
        back()
    }
    关闭弹窗()
    back()
}

function 看短剧赚更多金币() {
    复位到赚钱页面()
    if (!scrollDownFindText("看短剧赚更多金币", 8)) {
        return;
    }
    if (clickByOCR("看短剧赚更多金币")) {
        sleep(5000)
        let startTime = new Date().getTime();
        while (new Date().getTime() - startTime < 5 * 60 * 1000) {
            swipeTop();
            sleep(3000);
        }
    }
}

function 睡前看小说赚金币() {
    复位到赚钱页面()
    if (!scrollDownFindText("看小说赚金币", 8)) {
        return;
    }
    if (clickByOCR("看小说赚金币")) {
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
            }
            back()
            back()
        }

    }
}

function 看爆款短剧加倍赚金币() {
    复位到赚钱页面()
    if (!scrollDownFindText("看爆款短剧加倍赚金币", 8)) {
        return;
    }
    if (clickByOCR("看爆款短剧加倍赚金币")) {
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
    复位到赚钱页面()
    if (!scrollDownFindText("周末送加倍赚", 8)) {
        return;
    }
    if (clickByOCR("周末送加倍赚")) {
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
        sleep(5000)
        for (let i = 0; i < 50; i++) {
            swipeTop()
            sleep(5000)
        }
    }

}

function 设置获取广告时间() {
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

function 关闭弹窗() {
    if (text("关闭").exists()) {
        clickByText("关闭")
    }
    if (text("评价并收下金币").exists()) {
        clickByText("评价并收下金币")
    }
    if (text("开心收下").exists()) {
        clickByText("开心收下")
    }
    if (text("坚持退出").exists()) {
        clickByText("坚持退出")
    }
}

function 复位到赚钱页面() {
    if (id('jzc').exists()) {
        clickByText('jzc', {type: "id"})
        sleep(1000)
        for (let i = 0; i < 6; i++) {
            swipeBottom();
        }
        sleep(1500);
    } else {
        back()
        sleep(1000)
        复位到赚钱页面()
    }
}

module.exports = {
    appName: "抖音极速版",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        签到,
        回归现金福利,
        一键领金币, // 2927 金币
        打卡领华为手机,
        吃饭打卡赚金币, // 500 金币
        看广告赚金币,
        天天领金币,
        看直播开宝箱, //
        连续刷指定视频赚金币, // 35 金币
        逛街賺钱, // 598
        看短剧赚更多金币, //
        睡前看小说赚金币,
        看爆款短剧加倍赚金币,
        周末送加倍赚,
    ]
}