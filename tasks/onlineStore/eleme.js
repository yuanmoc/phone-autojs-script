const logger = require("../../core/logger.js")("eleme");
const { clickByText, swipeTop } = require("../../core/operator.js");

function 超市便利() {

}

function 看病买药() {

}

function 品质百货() {

}

module.exports = {
    enable: true,
    appName: "饿了么",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        超市便利,
        看病买药,
        品质百货
    ]
}