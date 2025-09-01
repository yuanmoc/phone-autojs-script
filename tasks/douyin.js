const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("douyin");
const appOperator = require("../core/operator.js");
const { clickByText, clickByMatches,clickWidget, swipeTop, swipeLeft, scrollDownFindElement } = appOperator;


function 签到() {
    复位到赚钱页面()
    if (!scrollDownFindElement(/已连续签到\d+天/, 8)) {
        return
    }
    if (clickByMatches(/已连续签到\d+天/, 1)) {
        sleep(3000)
    }
}

function 回归现金福利() {
    复位到赚钱页面()
    if (clickByText("立即领现金", 1)) {
        sleep(1000)
    }
}

function 一键领金币() {
    复位到赚钱页面()
    if (clickByMatches(/.*后可一键领取/, 1)) {
        sleep(1000)
        if (clickByText("一键领取")) {
            sleep(1000)
            back()
        }
    }
    if (clickByMatches(/已预约，.*可一键领取/, 1)) {
        sleep(1000)
        if (clickByText("立即领现金")) {
            if (clickByText("一键领取")) {
                sleep(1000)
                clickByText("开心收下")
                sleep(5000)
                clickByText("立即预约领取")
                back()
            }
        }
    }
}

function 打卡领华为手机() {
    复位到赚钱页面()
    if (!scrollDownFindElement(/已打卡\d+天，.*/, 8)) {
        return
    }
    if (clickByMatches(/已打卡\d+天，.*/, 1)) {
        sleep(2000)
        let list = text("点击打卡").find(5000)
        for (let i = 0; i < list.length; i++) {
            clickWidget(list[i])
            sleep(5000)
        }
        back()
    }
}

function 吃饭打卡赚金币() {
    复位到赚钱页面()
    if (!scrollDownFindElement("打卡领吃饭补贴，浏览精选美食团购", 8)) {
        return
    }
    if (clickByText("打卡领吃饭补贴，浏览精选美食团购")) {
        sleep(3000)
        if (clickWidget(textMatches(/看指定视频领.*/))) {
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
    关闭弹窗()
}

function 看广告赚金币() {
    复位到赚钱页面()
    if (!scrollDownFindElement(/看广告视频.*/, 8)) {
        return;
    }
    if (clickByMatches(/看广告视频.*/)) {
        sleep(40* 1000)
        back()
        sleep(1000)
        while (clickByText("领取奖励")) {
            sleep(40* 1000)
            if (!textContains("领取成功")) {
                back()
            }
            back()
            sleep(1000)
        }
    }
    关闭弹窗()
}

function 天天领金币() {
    复位到赚钱页面()
    if (!scrollDownFindElement(/今日签到立即领.*/, 8)) {
        return;
    }
    if (clickByMatches(/今日签到立即领.*/)) {
        sleep(5000)
        // TODO::
    }
}

function 看直播开宝箱() {
    复位到赚钱页面()
    if (!scrollDownFindElement(/开宝箱最高可得\d+金币，已完成.*/, 8)) {
        return;
    }
    if (clickByMatches(/开宝箱最高可得\d+金币，已完成.*/)) {
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

function 连续刷指定视频赚金币() {
    复位到赚钱页面()
    if (!scrollDownFindElement("双重奖励机制，看越多赚越多", 8)) {
        return;
    }
    if (clickByText("双重奖励机制，看越多赚越多")) {
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

function 逛街赚钱() {
    复位到赚钱页面()
    if (!scrollDownFindElement(/浏览低价商品\d+秒即得\d+金币，每日可完成.*次/, 8)) {
        return;
    }
    if (clickByMatches(/浏览低价商品\d+秒即得\d+金币，每日可完成.*次/)) {
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
    if (!scrollDownFindElement("剧集专属奖励", 8)) {
        return;
    }
    if (clickByText("剧集专属奖励")) {
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
    if (!scrollDownFindElement("睡前精彩小说，看越多赚越多", 8)) {
        return;
    }
    if (clickByText("睡前精彩小说，看越多赚越多")) {
        sleep(5000)
        if (text("签到领金币").exists()) {
            clickByText("签到领金币")
            sleep(5000)
        }
        if (text("明日再来").exists()) {
            clickByText("明日再来")
            sleep(5000)
        }
        if (clickByText("_Bq")) {
            sleep(3000)
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
    if (!scrollDownFindElement(/.*正在热播/, 8)) {
        return;
    }
    if (clickByMatches(/.*正在热播/)) {
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
    if (!scrollDownFindElement(/首次送.*金币/, 8)) {
        return;
    }
    if (clickByMatches(/首次送.*金币/)) {
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
}

function 复位到赚钱页面() {
    if (id("jyv").exists()) {
        clickByText("jyv")
        sleep(5000)
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
        逛街赚钱, // 598
        看短剧赚更多金币, //
        睡前看小说赚金币,
        看爆款短剧加倍赚金币,
        周末送加倍赚,
    ]
}