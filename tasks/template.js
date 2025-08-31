const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("template");
const appOperator = require("../core/operator.js");
const { clickByText, clickByMatches, swipeTop } = appOperator;


function 无限向上滑动() {
    while (true) {
        swipeTop()
        sleep(config.baseDelay * 5);
    }
}


module.exports = {
    miniProgram: false,
    appName: "AutoJs6",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        无限向上滑动
    ]
}