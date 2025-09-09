"ui";
// 加载配置和工具
const taskManager = require("./taskManager.js");
const { getConfig } = require("./config.js");
// 注册所有任务
taskManager.registerTasks();

// UI 界面
ui.layout(
    <vertical padding="16" layout_height="match_parent">
        <text text="AutoJs6 任务管理器" textSize="24sp" textColor="black" gravity="center" margin="16"/>
        <horizontal layout_width="match_parent" layout_height="0dp" layout_weight="1">
            <list id="task_list" >
                <horizontal>
                    <horizontal gravity="center_vertical">
                        <checkbox id="task_checkbox" checked="{{selected}}" layout_width="wrap_content" layout_height="wrap_content" margin="2"/>
                        <text id="task_name" text="{{name}}" textColor="black" textSize="16sp" layout_width="match_parent" layout_height="wrap_content" padding="8"/>
                    </horizontal>
                </horizontal>
            </list>

            <list id="method_list" >
                <horizontal>
                    <checkbox id="method_checkbox" checked="{{selected}}" layout_width="wrap_content" layout_height="wrap_content" margin="2"/>
                    <text id="method_name" text="{{name}}" textColor="black" textSize="16sp" layout_width="match_parent" layout_height="wrap_content" padding="8"/>
                </horizontal>
            </list>
            </horizontal>
        <text/>
        <button id="run_selected_task" text="运行选定任务" layout_width="match_parent" layout_height="wrap_content" margin_top="16"/>
        <button id="run_simple_tasks" text="运行简单任务" layout_width="match_parent" layout_height="wrap_content" margin_top="8"/>
        <button id="exit_app" text="退出" layout_width="match_parent" layout_height="wrap_content" margin_top="8"/>
    </vertical>
);

// 获取所有任务名称并填充到 list
const allTasks = taskManager.getAllTasks();
let dataSource = allTasks.map((task, index) => ({
    name: task.appName,
    taskId: task.taskId,
    index: index,
    selected: true,
    fun: task.fun,
    selectedFun: task.fun
}))

// 获取所有任务名称并填充到 ListView
ui.task_list.setDataSource(dataSource);
// 初始化方法 ListView
updateMethodList(dataSource[0])

// 根据选中的任务更新方法 ListView
function updateMethodList(item) {
    if (item && item.fun) {
        let displayMethod = item.fun.map((f, index) => ({
            name: f.name,
            index: index,
            parentIndex: item.index,
            selected:  item.selectedFun.some(sf => sf.name === f.name)
        }))
        ui.method_list.setDataSource(displayMethod);
    } else {
        ui.method_list.setDataSource([]);
    }
}

// 监听任务 ListView 选择变化
ui.task_list.on("item_bind", function(itemView, itemHolder){
    itemView.task_checkbox.on("click", function(){
        // 更新任务项的选中状态
        if (itemView.task_checkbox.checked) {
            dataSource[itemHolder.item.index].selected = true;
            dataSource[itemHolder.item.index].selectedFun = itemHolder.item.fun;
        } else {
            dataSource[itemHolder.item.index].selected = false;
            dataSource[itemHolder.item.index].selectedFun = [];
        }
        // 更新数据源
        ui.task_list.setDataSource(dataSource);
        // 更新方法列表显示
        updateMethodList(itemHolder.item);
    });
    itemView.task_name.on("click", function(){
        updateMethodList(itemHolder.item);
        // 重置所有文字颜色为黑色
        dataSource.forEach((item, index) => {
            let itemView = ui.task_list.getChildAt(index);
            if(itemView) {
                itemView.task_name.setTextColor(colors.parseColor("#000000"));
            }
        });
        // 设置当前点击的文字为蓝色
        itemView.task_name.setTextColor(colors.parseColor("#2196F3"));
    });
})

ui.method_list.on("item_bind", function(itemView, itemHolder){
    itemView.method_checkbox.on("click", function(){
        // 获取当前选中的任务项
        if (itemView.method_checkbox.checked) {
            let addFun = dataSource[itemHolder.item.parentIndex].fun[itemHolder.item.index]
            dataSource[itemHolder.item.parentIndex].selectedFun.push(addFun);
            dataSource[itemHolder.item.parentIndex].selected = true;
        } else {
            let removeFun = dataSource[itemHolder.item.parentIndex].fun[itemHolder.item.index];
            let selectedFun = dataSource[itemHolder.item.parentIndex].selectedFun;
            if (removeFun) {
                 dataSource[itemHolder.item.parentIndex].selectedFun = selectedFun.filter(f => (f.name !== removeFun.name));
                 if (dataSource[itemHolder.item.parentIndex].selectedFun.length === 0) {
                    dataSource[itemHolder.item.parentIndex].selected = false;
                }
            }
        }
        // 更新数据源
        ui.task_list.setDataSource(dataSource);
    });
})

// 运行选定任务按钮点击事件
ui.run_selected_task.click(function() {
    toast("运行选定任务");
    threads.start(function() {
        dataSource.forEach(item => {
            if (item.selected) {
                taskManager.runTask(item.taskId, item.selectedFun);
            }
        })
    });
});

let simpleTasks = getConfig("simpleTasks")

// 运行所有任务按钮点击事件
ui.run_simple_tasks.click(function() {
    toast("开始运行简单任务");
    // 在子线程中运行所有任务，避免阻塞UI线程
    threads.start(function() {
        for (let taskId in simpleTasks) {
            // 为每个任务 ID 运行指定的方法
            taskManager.runTask(taskId, simpleTasks[taskId]);
        }
    });
});

// 退出按钮点击事件
ui.exit_app.click(function() {
    toast("退出应用");
    exit();
});

// 静默时直接跑定时任务
if (!device.isScreenOn()) {
    // 屏幕是不亮屏，直接跑任务
    threads.start(function() {
        for (let taskId in simpleTasks) {
            // 为每个任务 ID 运行指定的方法
            taskManager.runTask(taskId, simpleTasks[taskId]);
        }
    });
}