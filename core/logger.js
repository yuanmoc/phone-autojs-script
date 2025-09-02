const appConfig = require('../config/appConfig.js');

// 创建悬浮窗,显示实时日志
let floatyWindow = floaty.rawWindow(
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
// 实时修改文字的函数
function updateText(newText) {
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
            if (appConfig.logEnabled) {
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