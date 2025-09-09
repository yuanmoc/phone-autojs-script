const logger = require("../core/logger.js")("taobao");
const {clickByText, clickWidget,findTextByOCR, isDeviceCenter} = require("../core/operator");


function 淘金币抵() {
    复位到首页()
    sleep(1000 * 2);
    clickByText("我的淘宝")

    sleep(1000 * 2);
    if (!clickByText("淘金币抵", { parentLevel: 1 })) {
        return;
    }

    clickByText("点击签到")
}

function 红包签到() {
    复位到首页()
    sleep(1000 * 2);
    if (!clickByText("红包签到", { parentLevel: 2 })) {
        return;
    }
    sleep(1000 * 2);
    // 关闭弹窗
    // 尝试3次点击关闭按钮
    for(let i = 0; i < 3; i++) {
        if (text("关闭").exists()) {
            if(clickWidget(text("关闭"))) {
                break;
            }
            sleep(1000);
        }
    }
    let _開 = findTextByOCR("開")
    if (_開 && isDeviceCenter(_開)) {
        clickWidget(_開)
    }
    sleep(1000 * 2);

    if (text("立即提现").exists()) {
        if(clickByText("立即提现")) {
            sleep(1000);
            clickByText("提现到支付宝")
            sleep(1000);
            back()
        }
    }

     if (text("继续提现").exists()) {
        if(clickByText("继续提现")) {
            sleep(1000);
            clickByText("提现到支付宝")
            sleep(1000);
            back()
        }
    }
    if(textMatches(/现金奖励.*/).exists()) {
        if(clickByText(/现金奖励.*/)) {
            if (text("立即提现").exists()) {
                if(clickByText("立即提现")) {
                    sleep(1000);
                    clickByText("提现到支付宝")
                    sleep(1000);
                    back()
                }
            }
            if (text("提现到支付宝").exists()) {
                clickByText("提现到支付宝")
                sleep(1000);
                back()
            }
        }
    }
    sleep(1000 * 2);
    // 尝试3次点击关闭按钮
    for(let i = 0; i < 3; i++) {
        if (text("关闭").exists()) {
            if(clickWidget(text("关闭"))) {
                break;
            }
            sleep(1000);
        }
    }
    
    sleep(1000 * 2);
    clickByText("立即签到")
}

function 复位到首页() {
    if (desc("首页").exists()) {
        if (!clickByText("首页")) {
            back()
            sleep(5000)
            复位到首页()
        }

    } else {
        back()
        sleep(5000)
        复位到首页()
    }
}


module.exports = {
    enable: true,
    appName: "淘宝",    // 任务名称
    priority: 1,             // 优先级
    fun: [
        红包签到,
        淘金币抵
    ]

}