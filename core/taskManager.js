const appConfig = require("../config/appConfig.js");
const config = require("../config/appConfig");
const logger = require("./logger.js")("taskManager");

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
                return { taskId: taskId, appName: taskModule.appName, priority: taskModule.priority, enabled: taskModule.enabled, run: taskModule.run };
            } catch (e) {
                logger.log(`加载任务 ${taskId} 失败: ${e.message}`);
                return { taskId: taskId, enabled: false};
            }
        });
        logger.log("所有任务已注册");
    },

    start: function() {
        this.registerTasks(); // 注册所有任务
        logger.log("任务管理器已启动");
        this.checkAndRunTasks(); // 立即执行一次检查
    },

    checkAndRunTasks: function() {
        sleep(appConfig.baseDelay); // 每次检查前的基础延迟
        tasks.sort((a, b) => a.priority - b.priority).forEach(task => {
            if (task.enabled) {
                logger.log(`${task.taskId} 准备执行任务: ${task.appName}`);
                this.runTask(task.taskId);
            }
        });
    },

    runTask: function(taskId) {
        const task = tasks.find(t => t.taskId === taskId);
        if (!task) {
            logger.log(`任务 ${taskId} 未找到`);
            return;
        }

        const execute = () => {
            sleep(appConfig.baseDelay); // 任务执行前的基础延迟
            try {
                task.run();
                sleep(config.baseDelay * 5); // 添加一个更长的延迟，以等待任务完成
                logger.log(`任务 ${task.appName} 执行成功`);
            } catch (e) {
                logger.log(`任务 ${task.appName} 执行异常: ${e.message}`);
            } finally {
                if (appConfig.autoExit) {
                    home();
                    sleep(appConfig.baseDelay);
                }
            }
        };
        execute();
    }

};