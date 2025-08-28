const config = require("../config/appConfig.js");
const logger = require("../core/logger.js")("template");
const appOperator = require("../core/operator.js");
const { clickByText, clickByMatches } = appOperator;

module.exports = {
    enabled: false,
    appName: "抖音极速版",    // 任务名称
    priority: 2,             // 优先级
    run: function() {
        // 1. 启动应用
        logger.log(`尝试启动${this.appName}`);
        if (!launchApp(this.appName)) {
            logger.log("启动应用失败");
            return;
        }
        // TODO: 添加任务逻辑
    }
}