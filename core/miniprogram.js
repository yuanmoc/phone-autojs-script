module.exports = {
  openMiniProgram(name) {
    launch("com.tencent.mm");
    sleep(5000)
    text("微信").findOne(5000)
    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 2 + 2000, 300)
    sleep(2000)
    if (!text(name).exists()) {
      clickText("更多")
    }
    sleep(2000)
    if (text(name).exists()) {
      clickText(name)
      return true
    } else {
      back()
      sleep(1000)
      back()
      console.log(`没找到小程序: ${name}`)
      return false
    }
  },
  rejectMessageRequest() {
    if (text('发送一次以下消息').findOne(5000)) {
      clickText('拒绝')
    }
  }
}