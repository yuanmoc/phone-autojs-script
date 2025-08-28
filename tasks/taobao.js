const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("taobao");
const appOperator = require("../core/operator.js");
const { clickByText, closePopup, clickWidget } = appOperator;

module.exports = {
    enabled: false,
    appName: "淘宝",    // 任务名称
    priority: 1,             // 优先级
    run: function() {
        // 1. 启动应用
        logger.log(`尝试启动${this.appName}`);
        if (!launchApp(this.appName)) {
            logger.log("启动应用失败");
            return;
        }
        sleep(5000)
        
        红包签到()
        淘金币抵()


        function 淘金币抵() {
            复位到首页()
            sleep(config.baseDelay * 2);
            clickByText("我的淘宝")

            sleep(config.baseDelay * 2);
            if (!clickByText("淘金币抵", 1)) {
                return;
            }

            clickByText("点击签到")
        }

        function 红包签到() {
            复位到首页()
            sleep(config.baseDelay * 2);
            if (!clickByText("红包签到", 2)) {
                return;
            }
            sleep(config.baseDelay * 2);
            // 关闭弹窗
            // 尝试3次点击关闭按钮
            for(let i = 0; i < 3; i++) {
                if (text("关闭").exists()) {
                    if(clickWidget(text("关闭"))) {
                        break;
                    }
                    sleep(1000);
                }
            }
            sleep(config.baseDelay * 2);
            clickByText("立即签到")
            sleep(config.baseDelay * 2);
            // 尝试3次点击关闭按钮
            for(let i = 0; i < 3; i++) {
                if (text("关闭").exists()) {
                    if(clickWidget(text("关闭"))) {
                        break;
                    }
                    sleep(1000);
                }
            }
            
            if (text("立即提现").exists()) {
                if(clickByText("立即提现")) {
                    clickByText("提现到支付宝")
                }
            }

        }

        function 复位到首页() {
            if (desc("首页").exists()) {
                if (!clickByText("首页")) {
                    back()
                    sleep(5000)
                    复位到首页()
                }
            } else {
                back()
                sleep(5000)
                复位到首页()
            }
        }
    }
}