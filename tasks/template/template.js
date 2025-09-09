const logger = require("../../core/logger.js")("template");
const { clickByText, swipeTop } = require("../../core/operator.js");


function 无限向上滑动() {
    while (true) {
        swipeTop()
        sleep(1000 * 5);
    }
}


module.exports = {
    enable: false,
    miniProgram: false,
    appName: "AutoJs6",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        无限向上滑动
    ]
}