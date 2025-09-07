const {getConfig} = require('./config.js');

// 悬浮窗单例
let floatyWindow = null;

// 创建悬浮窗单例
function createFloatyWindow() {
    if (floatyWindow) return;
    
    // 创建悬浮窗,显示实时日志
    floatyWindow = floaty.rawWindow(
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
    floatyWindow.setPosition(device.width / 100, device.height / 200);
}


// 实时修改文字的函数
function updateText(newText) {
    createFloatyWindow();
    // 打印出线程名称
    // console.log(threads.currentThread().getName());

    // 在主线程中更新UI
    ui.run(() => {
        floatyWindow.textView.setText(newText);
    });
}
function updateMethod(newMethod) {
    ui.run(() => {
        floatyWindow.methodView.setText(newMethod);
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
            ui.run(() => {
                floatyWindow.root.setVisibility(android.view.View.INVISIBLE);
            });
            sleep(500)
        },
        showTip: function() {
            ui.run(() => {
                floatyWindow.root.setVisibility(android.view.View.VISIBLE);
            });
        }
    };
};