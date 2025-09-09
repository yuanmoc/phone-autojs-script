const logger = require("../../core/logger.js")("meitan");
const { clickByText, swipeTop } = require("../../core/operator.js");

function 超市便利() {

}

function 看病买药() {

}

function 品质百货() {

}

module.exports = {
    enable: true,
    appName: "美团",    // 任务名称
    priority: 2,             // 优先级
    fun: [
        超市便利,
        看病买药,
        品质百货
    ]
}