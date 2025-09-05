let Config = {}
try {
  let configText = files.read(`config.json`)
  // 移除所有注释内容
  configText = configText.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
  Config = JSON.parse(configText)
} catch (e) {
  console.log(e)
  console.log('无法读取config.json，部分功能不可用')
}
module.exports = {
  getConfig(key) {
    return Config[key]
  }
}