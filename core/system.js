const {getConfig} = require("./config");
const {swipeTop}= require("./operator");
const {logger} = require("./logger")("system");

function prepareEnv() {
  // 唤醒设备屏幕
  device.wakeUp();
  // 返回主界面(这里主要是用于触发到可以上滑解锁页面)
  home()
  // 保持屏幕常亮
  device.keepScreenDim();
  // 设置音乐音量为5
  device.setMusicVolume(1);
  // 设置亮度调节模式为手动
  device.setBrightnessMode(0);
  // 设置屏幕亮度为10
  device.setBrightness(2);
  events.on('exit', function () {
    // 取消保持唤醒状态
    device.cancelKeepingAwake();
    // 恢复亮度调节模式为自动
    device.setBrightnessMode(1);
  });

  sleep(1000)
  if (_isScreenLocked()) {
    let screenLockPw = getConfig("screenLockPw")
    if (screenLockPw) {
      _unLockScreen(screenLockPw)
      if (_isScreenLocked()) {
        throw new Error('自动解锁失败');
      }
    } else {
      _waitScreenLocked()
    }
  }
}

function resetEnv() {
  // 取消保持唤醒状态
  device.cancelKeepingAwake();
  // 恢复亮度调节模式为自动
  device.setBrightnessMode(1);
}

function _isScreenLocked() {
  let screenLocked = textContains("上滑解锁").findOne(500)
  return screenLocked != null;
}

function _waitScreenLocked() {
  let count = 10
  for (let i = 0; i < count; i++) {
    if (_isScreenLocked()) {
      if (i === count - 1) {
        throw new Error('等待解锁屏幕超时')
      }
      swipeTop();
      sleep(2000)
    } else {
      logger.log('屏幕已解锁')
      break
    }
  }
}
function _unLockScreen(pw) {
  // console.log(device.fingerprint) 查看设备名称
  sleep(1000)
  swipeTop(null, 222)
  sleep(1000)
  if (device.fingerprint.includes('OnePlus')) {
      for (let i = 0; i < pw.length; i++) {
        click(
          id('com.android.systemui:id/pinColorNumericKeyboard')
            .findOne(1000)
            .findOne(desc(pw[i]))
        )
        sleep(100)
      }
      sleep(1000)
    } else if (device.fingerprint.includes('Xiaomi')) {
      for (let i = 0; i < pw.length; i++) {
        click(
          pickup({
            id: 'com.android.systemui:id/digit_text',
            text: pw[i]
          })
        )
        sleep(100)
      }
      sleep(1000)
    } else if (device.fingerprint.includes('HONOR')) {
      for (let i = 0; i < pw.length; i++) {
        var p = desc(pw[i].toString()).findOne(200);
        p.click();
        sleep(100)
      }
      sleep(1000)
    }
    else {
      throw new Error(`不支持该系统自动解锁: ${device.fingerprint}`)
    }
}

module.exports = { prepareEnv, resetEnv };
