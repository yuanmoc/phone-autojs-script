const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("kuaishou");
const appOperator = require("../core/operator.js");
const { clickByText, clickByMatches, swipeTop } = appOperator;

module.exports = {
    enabled: true,
    appName: "快手极速版",    // 任务名称
    priority: 2,             // 优先级
    run: function() {
        // 1. 启动应用
        logger.log(`尝试启动${this.appName}`);
        if (!launchApp(this.appName)) {
            logger.log("启动应用失败");
            return;
        }
        sleep(5000)
        立即签到()
        去点赞()
        去打卡();
        去打卡();
        去走路();
        去领取();
        领福利();
        看指定视频赚金币();
        去观看();

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

        function 领福利() {
            复位去赚钱()
            clickByText("轻松上手")
            sleep(1000)
            // 循环10次领取福利
            for (let i = 0; i < 10; i++) {
                if (clickByText("领福利")) {
                    sleep(100)
                    video_countdown = id("video_countdown").findOne(2000)
                    if (video_countdown) {
                        video_countdown_text = video_countdown.text()
                        let number = video_countdown_text.match(/\d+/)[0];
                        console.log(number)
                        sleep(number * 1000)
                    } else {
                        neo_count_down_text = id('neo_count_down_text').findOne(5000)
                        let neo_count_down_seconds = neo_count_down_text.text().match(/\d+/g).map(Number);
                        let totalSeconds = neo_count_down_seconds[0] * 60 + neo_count_down_seconds[1];
                        console.log(totalSeconds)
                        sleep(totalSeconds * 1000)
                    }
                    sleep(2000)
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


        function 去观看() {
            复位去赚钱()
            clickByText("轻松上手")
            sleep(1000)
            if (clickByText("去观看")) {
                // 运行10分钟
                let endTime = new Date().getTime() + 10 * 60 * 1000;
                while (new Date().getTime() < endTime) {
                    // 循环10次上滑操作
                    sleep(5000);
                    swipeTop();
                }

            }
        }


        function 复位去赚钱() {
            if (text("去赚钱").exists()) {
                clickByText("去赚钱")
            } else {
                back()
                sleep(1000)
                复位去赚钱()
            }
        }
        
    }
}