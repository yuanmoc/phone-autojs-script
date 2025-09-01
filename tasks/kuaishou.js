const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("kuaishou");
const appOperator = require("../core/operator.js");
const { clickByText, clickByMatches, swipeTop, closeApp, scrollDownFindElement } = appOperator;


function 立即签到() {
    复位去赚钱()
    clickByText("立即签到")
}

function 去点赞() {
    复位去赚钱()
    if (clickByText("去点赞")) {
        sleep(1000)
        clickByText("like_icon")
        back()
    }
}

function 去打卡() {
    for (let i = 0; i < 2; i++) {
        复位去赚钱()
        clickByText("海量金币")
        sleep(1000)
        if (clickByText("去打卡")) {
            sleep(2000)
            clickByText("去签到")
            sleep(1000)
            clickByText("去打卡")
            sleep(1000)
            back()
        }
    }
}

function 去走路() {
    复位去赚钱()
    clickByText("轻松上手")
    sleep(1000)
    if (clickByText("去走路")) {
        sleep(1000)
        clickByMatches(/领取\d+金币/)
        sleep(1000)
        back()
    }
}

function 去领取() {
    复位去赚钱()
    clickByText("轻松上手")
    sleep(1000)
    if (clickByText("去领取")) {
        sleep(1000)
        clickByMatches(/领取饭补\d+金币/)
        sleep(1000)
        back()
    }
}

function 看广告得金币() {
    复位去赚钱()
    clickByText("轻松上手")
    sleep(1000)
    // 循环10次领取福利
    for (let i = 0; i < 10; i++) {
        if (clickByText("看广告得金币")) {
            sleep(2000)
            设置获取广告时间()
            back()
            sleep(1000)
            clickByText("close_view")
            sleep(1000)
        }
    }
}

function 看指定视频赚金币() {
    复位去赚钱()
    clickByText("海量金币")
    sleep(1000)

    if (clickByText("看指定视频赚金币", 2, 9 / 10, 1 / 2)) {
        // 运行10分钟
        let endTime = new Date().getTime() + 10 * 60 * 1000;
        while (new Date().getTime() < endTime) {
            // 循环10次上滑操作
            sleep(5000);
            swipeTop();
            // 直播直接跳过
            while (id("live_follow_text_view").exists()) {
                swipeTop();
                sleep(1000);
            }
        }
    }
}

function 立即领取() {
    复位去赚钱()
    clickByText("海量金币")
    sleep(2000)
    clickByMatches(/.*立即领取/)
}


function 看视频赚金币() {
    复位去赚钱()
    clickByText("轻松上手")
    sleep(1000)
    if (clickByText("看视频赚金币", 2, 9 / 10, 1 / 2)) {
        // 运行10分钟
        let endTime = new Date().getTime() + 10 * 60 * 1000;
        while (new Date().getTime() < endTime) {
            // 循环10次上滑操作
            sleep(5000);
            swipeTop();
        }
    }
}

function 刷广告视频赚金币() {
    复位去赚钱()
    clickByText("猜你喜欢")
    sleep(1000)
    if (!scrollDownFindElement("刷广告视频赚金币")) {
        return;
    }
    sleep(1000)
    if (clickByText("刷广告视频赚金币", 2, 9 / 10, 1 / 2)) {
        for (let i = 0; i < 100; i++) {
            swipeTop()
            sleep(5000)
        }
    }
}

function 设置获取广告时间() {
    let sleep_time = null
    let video_countdown = id("video_countdown").findOne(5000)
    if (video_countdown) {
        let video_countdown_text = video_countdown.text()
        sleep_time = video_countdown_text.match(/\d+/)[0];
    } else {
        let neo_count_down_text = id('neo_count_down_text').findOne(5000)
        if (neo_count_down_text) {
            let neo_count_down_seconds = neo_count_down_text.text().match(/\d+/g).map(Number);
            sleep_time = neo_count_down_seconds[0] * 60 + neo_count_down_seconds[1];
        }

    }
    sleep_time = sleep_time || 62
    logger.log("sleep_time: " + sleep_time)
    sleep(sleep_time * 1000)
}


function 复位去赚钱() {
    if (text("去赚钱").exists()) {
        clickByText("去赚钱")
        sleep(4000)
    } else {
        back()
        sleep(1000)
        复位去赚钱()
    }
}

module.exports = {
    appName: "快手极速版",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        去点赞,
        去打卡,
        去走路,
        去领取,
        看广告得金币, // 15-200 金币
        刷广告视频赚金币, // 15 金币
        看指定视频赚金币, // 166 金币
        看视频赚金币, // 目前没有
        立即领取,
    ]
}