const logger = require("../core/logger.js")("kuaishou");
const { clickByText, swipeTop, scrollDownFindText } = require("../core/operator");


function 立即签到() {
    _复位去赚钱()
    clickByText("海量金币")
    sleep(3000)
    clickByText("立即签到")
}

function 去点赞() {
    _复位去赚钱()
    if (clickByText("去点赞")) {
        sleep(1000)
        clickByText("like_icon")
        back()
    }
}

function 去打卡() {
    for (let i = 0; i < 2; i++) {
        _复位去赚钱()
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
    _复位去赚钱()
    clickByText("轻松上手")
    sleep(1000)
    if (clickByText("去走路")) {
        sleep(1000)
        clickByText(/领取\d+金币/)
        sleep(1000)
        back()
    }
}

function 去领取() {
    _复位去赚钱()
    clickByText("轻松上手")
    sleep(1000)
    if (clickByText("去领取")) {
        sleep(1000)
        clickByText(/领取饭补\d+金币/)
        sleep(1000)
        back()
    }
}

function 看广告得金币() {
    _复位去赚钱()
    clickByText("轻松上手")
    sleep(1000)
    // 循环10次领取福利
    for (let i = 0; i < 10; i++) {
        if (clickByText("看广告得金币")) {
            sleep(2000)
            if (_设置获取广告时间()) {
                back()
                sleep(1000)
                clickByText("close_view")
                sleep(1000)
            }
        }
    }
}

function 看指定视频赚金币() {
    _复位去赚钱()
    clickByText("海量金币")
    sleep(1000)
    if (clickByText("看指定视频赚金币", {parentLevel:2, offsetXRatio: 9/10})) {
        let endTime = new Date().getTime() + 5 * 60 * 1000;
        while (new Date().getTime() < endTime) {
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
    _复位去赚钱()
    clickByText("海量金币")
    sleep(2000)
    clickByText(/.*立即领取/)
    sleep(1000)
}


function 看视频赚金币() {
    _复位去赚钱()
    clickByText("轻松上手")
    sleep(1000)
    if (clickByText("看视频赚金币", {parentLevel:2, offsetXRatio:9 / 10})) {
        let endTime = new Date().getTime() + 5 * 60 * 1000;
        while (new Date().getTime() < endTime) {
            swipeTop();
            sleep(5000);
        }
    }
}

function 刷广告视频赚金币() {
    _复位去赚钱()
    clickByText("猜你喜欢")
    sleep(1000)
    if (scrollDownFindText("刷广告视频赚金币")) {
        if (clickByText("刷广告视频赚金币", {parentLevel:2, offsetXRatio: 9/10})) {
            let endTime = new Date().getTime() + 5 * 60 * 1000;
            while (new Date().getTime() < endTime) {
                swipeTop();
                sleep(5000);
            }
        }
    }
}

function _设置获取广告时间() {
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
    if (sleep_time) {
        logger.log("sleep_time: " + sleep_time)
        sleep(sleep_time * 1000)
        return true;
    }
    return false;
}


function _复位去赚钱() {
    // 关闭弹窗

    if (text("去赚钱").exists()) {
        clickByText("去赚钱")
        sleep(4000)
    } else {
        back()
        sleep(1000)
        _复位去赚钱()
    }
}

module.exports = {
    appName: "快手极速版",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        立即签到,
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