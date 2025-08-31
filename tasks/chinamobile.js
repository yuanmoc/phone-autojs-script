const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("chinamobile");
const appOperator = require("../core/operator.js");
const { clickByText, clickByMatches, closeApp } = appOperator;


function 去签到() {
    clickByMatches(/\d+\s?跳过/);

    // 关闭广告
    sleep(config.baseDelay * 2);
    clickByText("iv_close_top")

    if (!clickByText("我的")) {
        return;
    }
    sleep(config.baseDelay);

    logger.log("尝试点击'签到'或相关按钮");
    clickByText("float_window_img");

    sleep(config.baseDelay*5);
    if (!clickByText("本月已累计签到：", 3, 1/2, 4/5)) {
        logger.log("未找到签到按钮");
    }
    sleep(config.baseDelay*5);
}

module.exports = {
    appName: "中国移动",    // 任务名称
    priority: 2,             // 优先级
    fun: [去签到]
};