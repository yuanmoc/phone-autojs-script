const {getConfig} = require('./config.js');

// 创建悬浮窗单例
function createFloatyWindow() {
    if (global.floatyWindow) return;
    // 打印出线程名称
    console.log("createFloatyWindow: " + threads.currentThread().getName());
    // 创建悬浮窗,显示实时日志
    global.floatyWindow = floaty.rawWindow(
        <frame id="root" gravity="center">
            <card cardCornerRadius="6dp" cardElevation="0dp" >
                <horizontal padding="8 4" background="#CC000000">
                    <text id="methodView"
                        text=""
                        textSize="12sp"
                        textColor="#FFFFFF"
                        textStyle="bold"
                        padding="2 0"
                        clickable="false"
                        touchable="false"/>
                    <text id="textView"
                        text=""
                        textSize="12sp"
                        textColor="#4CAF50"
                        padding="2 0"
                        clickable="false"
                        touchable="false"
                        singleLine="true"
                        ellipsize="end"/>
                </horizontal>
            </card>
        </frame>
    );
    // 设置悬浮窗位置和大小
    global.floatyWindow.setPosition(device.width / 100, device.height / 200);
}

// 全局创建
createFloatyWindow();

// 实时修改文字的函数
function updateText(newText) {
    ui.post(() => {
        global.floatyWindow.textView.setText(newText);
    });
}
function updateMethod(newMethod) {
    ui.post(() => {
        global.floatyWindow.methodView.setText(newMethod);
    });
}

module.exports = function(tag='default') {
    return {
        log: function(message) {
            if (getConfig("logEnabled")) {
                updateText(`${message}`)
                console.log(`[${tag}] ${message}`)
            }
        },
        updateMethod: updateMethod,
        hideTip: function() {
            ui.post(() => {
                global.floatyWindow.root.setVisibility(android.view.View.INVISIBLE);
            });
            sleep(500)
        },
        showTip: function() {
            ui.post(() => {
                global.floatyWindow.root.setVisibility(android.view.View.VISIBLE);
            });
        }
    };
};