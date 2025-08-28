// 加载配置和工具
const taskManager = require("./core/taskManager.js");

const chinamobile = require("./tasks/chinamobile.js");
const douyin = require("./tasks/douyin.js");
const kuaishou = require("./tasks/kuaishou.js");
const pinduoduo = require("./tasks/pinduoduo.js");
const taobao = require("./tasks/taobao.js");
const zhifubao = require("./tasks/zhifubao.js");

// 注册所有任务并启动调度
// taskManager.start();

// 单个运行
// chinamobile.run()
// douyin.run()
// kuaishou.run()
// pinduoduo.run()
// taobao.run()
zhifubao.run()
