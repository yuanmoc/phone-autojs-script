function openGKDApi() {
    if (checkGKD()) {
      return
    }
    if (launch('li.songe.gkd')) {
      sleep(2000)
      if (text('设置').findOne(5000)) {
        click(text('设置').findOne(5000))
        sleep(1000)
      }
      if (text('高级设置').findOne(5000)) {
        click(text('高级设置').findOne(5000))
        sleep(1000)
      }
      const httpServer = text('在浏览器下连接调试工具').findOne(5000)
      if (httpServer) {
        let clickX = device.width / 20 * 19
        let clickY = httpServer.bounds().top
        click(clickX, clickY)
        sleep(2000)
      }
    }
}
function checkGKD() {
    try {
      http.get('http://127.0.0.1:62354/api/device', {
        timeout: 1500
      })
      return true
    } catch (e) {
      console.log("checkGKD 失败")
      return false
    }
}
function queryByGKD(selector, action) {
    if (!checkGKD()) {
        return null;
    }
    const result = JSON.parse(http.postJson('http://127.0.0.1:62354/api/execSelector', {
      action,
      "selector": selector,
      "quickFind": false,
      "fastQuery": false
    }).body.string())
    if (result.__error) {
      throw new Error(result.message)
    } else {
      return result
    }
}
function tryClick(selector) {
    if (!checkGKD()) {
        return false;
    }
    try {
      this.queryByGKD(selector, 'click')
      return true
    } catch (e) {
      return false
    }
}
function captureSnapshot() {
    if (!checkGKD()) {
        return;
    }
    try {
      let snapshot = JSON.parse(http.get('http://127.0.0.1:62354/api/captureSnapshot').body.string())
      console.log(`已保存异常快照: ${snapshot.id}`)
      return snapshot;
    } catch (e) {
      console.log(e)
      console.log('保存快照失败')
    }
}
module.exports = {
    openGKDApi,
    checkGKD,
    queryByGKD,
    tryClick,
    captureSnapshot
}