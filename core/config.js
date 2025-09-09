let Config = {}
try {
  let configText = files.read(`config.json`)
  // 移除所有注释内容
  configText = configText.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
  // 处理单引号字符串为双引号字符串，并转义内部双引号
  configText = configText.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (match, content) => {
    return '"' + content.replace(/"/g, '\\"') + '"'
  })
  // 移除尾随逗号
  configText = configText.replace(/(,)(\s*[}\]])/g, '$2')
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