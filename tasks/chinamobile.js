const logger = require("../core/logger.js")("chinamobile");
const { clickByText, clickByOCR } = require("../core/operator.js");


function 去签到() {
    if(textMatches(/\d+\s?跳过/).exists()) {
        clickByText(/\d+\s?跳过/);
    }

    // 关闭广告
    sleep(1000 * 2);
    if (id("iv_close_top").exists()) {
        clickByText("iv_close_top")
    }
    if (id("close_btn").exists()) {
        clickByText("close_btn");
    }

    if (!clickByText("我的")) {
        return;
    }
    sleep(1000);

    logger.log("尝试点击'签到'或相关按钮");
    clickByText("float_window_img");

    sleep(1000*5);
    if (text("抽奖").exists()) {
        clickByText("抽奖");
        sleep(1000);
        if (text("去使用").exists()) {
            clickByText("去使用")
            sleep(1000);
            back();
        }
    }
    sleep(1000);

    if (clickByOCR("立即签到")) {
        clickByText("是");
    }
    sleep(1000*5);
}

module.exports = {
    appName: "中国移动",    // 任务名称
    priority: 2,             // 优先级
    fun: [去签到]
};