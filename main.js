"ui";
// 加载配置和工具
const taskManager = require("./core/taskManager.js");
// 注册所有任务
taskManager.registerTasks();

// 判断是否在UI模式下运行
// UI 界面
ui.layout(
    <vertical padding="16">
        <text text="AutoJs6 任务管理器" textSize="24sp" textColor="black" gravity="center" margin="16"/>
        <spinner id="task_spinner" layout_width="match_parent" layout_height="wrap_content"/>
        <text/>
        <spinner id="method_spinner" layout_width="match_parent" layout_height="wrap_content" margin_top="12" />
        <text/>
        <button id="run_selected_task" text="运行选定任务" layout_width="match_parent" layout_height="wrap_content" margin_top="16"/>
        <button id="run_all_tasks" text="运行所有任务" layout_width="match_parent" layout_height="wrap_content" margin_top="8"/>
        <button id="exit_app" text="退出" layout_width="match_parent" layout_height="wrap_content" margin_top="8"/>
    </vertical>
);

const allTaskName = "全部任务"
// 获取所有任务名称并填充到 Spinner
const allTasks = taskManager.getAllTasks();

ui.post(() => {
    let taskNames = allTasks.map(task => task.appName || task.taskId);
    // 如果没有任务，提供默认选项
    let displayTaskNames = taskNames.length > 0 ? taskNames : ["暂无任务"];

    const taskAdapter = new android.widget.ArrayAdapter(context, android.R.layout.simple_spinner_item, displayTaskNames);
    ui.task_spinner.setAdapter(taskAdapter);
    ui.task_spinner.setSelection(0);

    // 设置 Spinner 下拉项的 padding
    taskAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
    const dropdownView = taskAdapter.getDropDownView(0, null, ui.task_spinner);
    if (dropdownView) {
        dropdownView.setPadding(20, 20, 20, 20);
    }
    
    // 初始化方法Spinner
    updateMethodSpinner(0);
});

// 根据选中的任务更新方法Spinner
function updateMethodSpinner(taskIndex) {
    const selectedTask = allTasks[taskIndex];
    const displayMethodNames = (selectedTask.fun && Object.keys(selectedTask.fun).map(key => selectedTask.fun[key].name || key)) || [];
    displayMethodNames.unshift(allTaskName);
    
    const methodAdapter = new android.widget.ArrayAdapter(context, android.R.layout.simple_spinner_item, displayMethodNames);
    ui.method_spinner.setAdapter(methodAdapter);
    ui.method_spinner.setSelection(0);

    // 设置 Spinner 下拉项的 padding
    methodAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
    const dropdownView = methodAdapter.getDropDownView(0, null, ui.method_spinner);
    if (dropdownView) {
        dropdownView.setPadding(20, 20, 20, 20);
    }
}

// 监听任务Spinner选择变化
ui.task_spinner.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
    onItemSelected: function(adapterView, view, position, id) {
        console.log("当前选中的任务索引:", position);
        updateMethodSpinner(position);
    },
    onNothingSelected: function(adapterView) {
        // 未选择任何项时的处理
    }
}));

// 运行选定任务按钮点击事件
ui.run_selected_task.click(function() {
    const selectedIndex = ui.task_spinner.getSelectedItemPosition();
    console.log("当前选中的任务索引:", selectedIndex);
    const selectedMethodName = ui.method_spinner.getSelectedItem();
    console.log("当前选中的方法名称:", selectedMethodName);

    const selectedTask = allTasks[selectedIndex];
    if (selectedTask) {
        toast(`开始运行任务: ${selectedTask.appName || selectedTask.taskId}`);
        // 在子线程中运行任务，避免阻塞UI线程
        threads.start(function() {
            if (selectedMethodName === allTaskName) {
                taskManager.runTask(selectedTask.taskId, selectedTask.fun);
            } else {
                // 从selectedTask.fun中根据方法名称获取方法
                const selectedMethodKey = Object.keys(selectedTask.fun).find(key => selectedTask.fun[key].name === selectedMethodName);
                if (selectedMethodKey) {
                    const selectedMethod = selectedTask.fun[selectedMethodKey];
                    taskManager.runTask(selectedTask.taskId, [selectedMethod]);
                } else {
                    toast("未找到指定的方法");
                }
            }
        });
    } else {
        toast("请选择一个有效的任务");
    }
});

// 运行所有任务按钮点击事件
ui.run_all_tasks.click(function() {
    toast("开始运行所有任务");
    // 在子线程中运行所有任务，避免阻塞UI线程
    threads.start(function() {
        taskManager.checkAndRunTasks();
    });
});

// 退出按钮点击事件
ui.exit_app.click(function() {
    toast("退出应用");
    exit();
});

// 保持脚本运行，直到用户退出
ui.emitter.on("pause", () => {
    // 当UI暂停时，可以执行一些清理操作
});

ui.emitter.on("resume", () => {
    // 当UI恢复时，可以执行一些恢复操作
});

// 测试调试使用
// threads.start(function() {
//     taskManager.runTask("kuaishou", ["看广告得金币"])
// })
