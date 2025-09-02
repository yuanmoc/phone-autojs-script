# Phone AutoJs6 Script

## 项目简介

这是一个基于 AutoJs6 的自动化脚本项目，旨在通过模拟用户操作，实现手机应用的自动化任务。

## 环境要求

**Shizuku**: 需要安装APP  

[Shizuku地址](https://github.com/RikkaApps/Shizuku)  

使用 https://docs.autojs6.com/#/shizuku ，用于授予 AutoJs6 "修改安全设置"，"投影媒体"，"无障碍服务" 权限

使用无线启动Shizuku：https://shizuku.rikka.app/zh-hans/guide/setup/#%E9%80%9A%E8%BF%87%E6%97%A0%E7%BA%BF%E8%B0%83%E8%AF%95%E5%90%AF%E5%8A%A8

## 安装与运行

1. **安装AutoJs6**：
    请在您的Android设备上安装Auto.js应用。您可以从[AutoJs6官方GitHub](https://docs.autojs6.com)或其他可信来源获取。

2. **克隆项目**：
    将本项目克隆到您的电脑上：
    ```bash
    git clone https://github.com/yuanmoc/phone-autojs-script.git
    ```

3. **基本配置**：
- 打开 vscode ，并安装插件 AutoJs6 VSCode Extension。安装插件后，在 vscode 编辑器的右上角点有 AutoJs6 相关操作。
- 打开手机上的AutoJs6应用，点开左上角菜单，打开浮动按钮、服务端模式（有ip地址）、无障碍服务、显示在其他应用上层。
- 在vscode中，点击右上角传输图标，选择［连接1- 客户端模式（Client）|局域网 （LAN）]，输入手机ip地址（手机和电脑需要在同一个局域网中）
    

4. **传输项目到手机**：
    点击 vscode 中的保存项目到设备，把项目传输到手机上。

5. **运行脚本**：
- 打开手机上的AutoJs6应用，找到并打开 `phone-autojs-script` 项目，然后运行 `main.js`。
- 也可以在 vscode 上点击运行脚本。    

## 使用说明

项目中的自动化任务通过 `tasks` 目录下的脚本进行管理。每个脚本对应一个具体的自动化任务（例如：中国移动、抖音、拼多多等）。

您可以通过修改 `config/appConfig.js` 来配置任务相关的参数。

## 项目结构

```
config/                 # 配置文件目录
└── appConfig.js        # 应用配置，例如任务参数等
core/                   # 核心模块目录
├── logger.js           # 日志模块
├── operator.js         # 操作模块，封装了常见的UI操作
└── taskManager.js      # 任务管理模块，用于调度和执行任务
main.js                 # 项目主入口文件
project.json            # AutoJs6项目配置文件
tasks/                  # 自动化任务脚本目录
├── chinamobile.js      # 中国移动任务脚本
├── douyin.js           # 抖音任务脚本
├── kuaishou.js         # 快手任务脚本
├── pinduoduo.js        # 拼多多任务脚本
├── taobao.js           # 淘宝任务脚本
├── template.js         # 任务模板，用于创建新的任务脚本
└── zhifubao.js         # 支付宝任务脚本
```

## 任务说明

-   **`main.js`**: 项目的入口文件，负责初始化环境和调度任务。
-   **`config/appConfig.js`**: 包含所有任务的配置信息，如任务开关、执行次数、延迟等。
-   **`core/logger.js`**: 提供统一的日志输出功能，方便调试和问题排查。
-   **`core/operator.js`**: 封装了Auto.js常用的UI操作，如点击、滑动、查找控件等，提高脚本的可读性和复用性。
-   **`core/taskManager.js`**: 负责任务的注册、启动、停止和管理。
-   **`tasks/` 目录**: 存放具体的自动化任务脚本。每个脚本都应该实现特定的自动化流程。

## 如何添加新的自动化任务

1.  在 `tasks` 目录下创建一个新的 `.js` 文件，例如 `tasks/newTask.js`。
2.  可以参考 `tasks/template.js` 的结构来编写您的任务脚本.
3. 会在`core/taskManager.js`自动注册进去执行，不需要手动注册。
