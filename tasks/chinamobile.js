const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("chinamobile");
const appOperator = require("../core/operator.js");
const { clickByText, clickByOCR } = appOperator;


function 去签到() {
    if(textMatches(/\d+\s?跳过/).exists()) {
        clickByText(/\d+\s?跳过/);
    }

    // 关闭广告
    sleep(config.baseDelay * 2);
    if (id("iv_close_top").exists()) {
        clickByText("iv_close_top")
    }
    if (id("close_btn").exists()) {
        clickByText("close_btn");
    }

    if (!clickByText("我的")) {
        return;
    }
    sleep(config.baseDelay);

    logger.log("尝试点击'签到'或相关按钮");
    clickByText("float_window_img");

    sleep(config.baseDelay*5);

    if (clickByOCR("立即签到")) {
        clickByText("是");
    }
    sleep(config.baseDelay*5);
}

module.exports = {
    appName: "中国移动",    // 任务名称
    priority: 2,             // 优先级
    fun: [去签到]
};