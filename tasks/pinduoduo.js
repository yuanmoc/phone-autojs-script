const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("template");
const appOperator = require("../core/operator.js");
const { clickByText, clickWidget, swipeLeft, swipeTop } = appOperator;

module.exports = {
    enabled: false,
    appName: "拼多多",    // 任务名称
    priority: 2,             // 优先级
    run: function() {
        // 1. 启动应用
        logger.log(`尝试启动${this.appName}`);
        if (!launchApp(this.appName)) {
            logger.log("启动应用失败");
            return;
        }
        sleep(5000)
        去阅读()
        去逛逛()
        去观看()

        function 去阅读() {
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
        }

        function 去逛逛() {
            复位到金币页面()
            sleep(1000)
            list = text("去逛逛").find(2000)
            for (let i = 0; i < list.length; i++) {
                clickWidget(list[i])
                let startTime = new Date().getTime();
                while (new Date().getTime() - startTime < 66 * 1000) {
                    sleep(config.baseDelay * 5);
                    swipeTop();
                }
                back()
            }
            
        }

        function 去观看() {
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
            if (text("金币").exists()) {
                if (!clickByText("金币", 1, 1/2, 1/2, 1000)) {
                    back()
                    sleep(1000)
                    复位到金币页面()
                }
                sleep(1000)
            } else if (text("多多视频").exists()) {
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
            } else {
                back()
                sleep(1000)
                复位到金币页面()
            }
        }

    }
}