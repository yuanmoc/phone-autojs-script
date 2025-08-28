const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("zhifubao");
const appOperator = require("../core/operator.js");
const { clickByText, clickWidget, swipeTop } = appOperator;

module.exports = {
    enabled: false,
    appName: "支付宝",    // 任务名称
    priority: 2,             // 优先级
    run: function() {
        // 1. 启动应用
        logger.log(`尝试启动${this.appName}`);
        if (!launchApp(this.appName)) {
            logger.log("启动应用失败");
            return;
        }
        sleep(5000)

        广告金币();
        
        刷视频();

        function 广告金币() {
            复位到视频页面()
            sleep(1000)
            if (clickByText('suspendLayout')) {
                let list = text("去看看").find(2000);
                for (let i = 0; i < list.length; i++) {
                    logger.log(`点击${list[i].text()}`);
                    clickWidget(list[i]);
                    sleep(5 * 1000); // 浏览5秒返回
                    back();
                }
                sleep(config.baseDelay * 10);
                if (clickByText("浏览广告领红包", 2, 9 / 10, 1 / 2)) {
                    for (let i = 0; i < 50; i++) {
                        sleep(6 * 1000);
                        if (text('已领完').exists()) {
                            break;
                        }
                        sleep(6 * 1000); // 浏览12秒
                        swipeTop();
                    }
                    back();
                }
                back();
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
            if(text("视频").exists()) {
                clickByText("视频")
                sleep(2 * 1000)
            } else {
                back()
                sleep(1000)
                复位到视频页面()
            }
        }
    }
}