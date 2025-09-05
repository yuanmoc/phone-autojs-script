const {getConfig} = require("./config.js");
const logger = require("./logger.js")("taskManager");
const {closeApp, clickByText, openMiniProgram} = require("./operator.js");
let { prepareEnv, resetEnv } = require("./system.js");

let tasks = [];

module.exports = {
    registerTasks: function() {
        const dir = "tasks"
        const taskFiles = files.listDir(dir, function(name){
            return name.endsWith(".js") && files.isFile(files.join(dir, name));
        });

        tasks = taskFiles.map(fileName => {
            const taskId = fileName.replace(".js", "");
            try {
                logger.log(`加载任务文件: tasks/${fileName}`);
                const taskModule = require(`../tasks/${fileName}`);
                // 假设每个任务模块都导出了一个包含run方法的对象
                return Object.assign({taskId: taskId}, taskModule);
            } catch (e) {
                logger.log(`加载任务 ${taskId} 失败: ${e.message}`);
            }
        });
        logger.log("所有任务已注册");
    },

    getAllTasks: function() {
        return tasks;
    },

    checkAndRunTasks: function() {
        logger.log("任务管理器已启动");
        sleep(1000); // 每次检查前的基础延迟
        tasks.sort((a, b) => a.priority - b.priority).forEach(task => {
            logger.log(`${task.taskId} 准备执行任务: ${task.appName}`);
            this.runTask(task.taskId);
        });
    },


    runTask: function(taskId, funNameArr=null) {
        const task = tasks.find(t => t.taskId === taskId);
        if (!task) {
            logger.log(`任务 ${taskId} 未找到`);
            return;
        }

        try {
            // 0. 设置环境
            prepareEnv()
            // 1. 启动应用
            logger.log(`尝试启动${task.appName}`);
            if (task.miniProgram) {
                if (!openMiniProgram(task.appName)) {
                    logger.log("启动小程序失败");
                    return;
                }
            } else {
                if (!launchApp(task.appName)) {
                    logger.log("启动应用失败");
                    return;
                }
                if (textMatches(/.AutoJs6.想要打开.*/, 1000)) {
                    clickByText("允许")
                }
            }
            // 启动应用后等待一段时间
            sleep(3000)
            // 2. 执行任务
            // 默认执行全部
            if (!funNameArr) {
                logger.log(`任务 ${taskId} 未指定函数，默认执行全部`);
                funNameArr = task.fun
            }
            for (let funName of funNameArr) {
                if (typeof funName === 'function') {
                    logger.log(`执行函数 ${funName.name}`);
                    logger.updateMethod(funName.name)
                    funName();
                } else if (typeof funName === 'string') {
                    logger.log(`执行字符串函数 ${funName}`);
                    logger.updateMethod(funName)
                    // 根据名称查找方法，并执行
                    let methodKey = Object.keys(task.fun).find(key => task.fun[key].name === funName);
                    if (methodKey) {
                        let method = task.fun[methodKey];
                        method()
                    } else {
                        logger.log(`未找到指定的方法: ${funName}`);
                    }
                }
            }
            // 添加一个更长的延迟，以等待任务完成
            sleep(6000);
            logger.log(`任务 ${task.appName} 执行成功`);
        } catch (e) {
            logger.log(`任务 ${task.appName} 执行异常: ${e.message}`);
        } finally {
            if (getConfig("autoExit")) {
                // 关闭应用
                closeApp(task.appName)
                home();
                sleep(5000);
            }
            // 重置环境
            resetEnv()
        }
    }

};