const logger = require("../core/logger.js")("operator");

/**
 * 上滑关闭指定app
 * @param appName
 */
function closeApp(appName) {
    logger.log(`尝试关闭${appName}`);
    home()
    sleep(1000)
    // 任务列表
    recents();
    sleep(1000)
    let titleList = id("title").find(5000)
    for (let i = titleList.length - 1; i >= 0; i--) {
      if (titleList[i].text() === appName) {
        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 2 - 1000, 200)
        sleep(1000)
        home();
        logger.log(`已关闭${appName}`)
        return true;
      } else {
          swipe(device.width / 2, device.height / 2, device.width * 2 / 3, device.height / 2, 100)
          sleep(1000)
      }
    }
    logger.log(`${appName}关闭失败`)
    return false;
}
/**
 * 点击指定控件的第几层父控件的 x,y位置
 * @param {object} widget 控件对象
 * @param {number} parentLevel 父控件层级 (0表示当前控件，1表示父控件，以此类推)
 * @param {number} offsetXRatio 相对于父控件宽度的x轴比例 (0-1之间)
 * @param {number} offsetYRatio 相对于父控件高度的y轴比例 (0-1之间)
 * @returns {boolean} 是否成功点击
 */
function clickWidget(widget, parentLevel=0, offsetXRatio=1/2, offsetYRatio=1/2) {
    if(!widget) {
        return false;
    }
    let parent = widget;
    for (let i = 0; i < parentLevel; i++) {
        if (parent && parent.parent()) {
            parent = parent.parent();
        } else {
            logger.log("没找到控件的" + parentLevel + "层父控件")
            return false; // 找不到指定层级的父控件
        }
    }
    // 如果可以点击，优先使用点击事件
    if (parent.clickable()) {
        return parent.click();
    }
    if (parent) {
        let bounds = parent.bounds();
        let clickX = bounds.left + (bounds.right - bounds.left) * offsetXRatio;
        let clickY = bounds.top + (bounds.bottom - bounds.top) * offsetYRatio;
        return click(clickX, clickY);
    }
    return false;
}

/**
 * 点击指定文本的控件的第几层父控件的 x,y位置
 * @param {string} _text 控件文本
 * @param {number} parentLevel 父控件层级 (0表示当前控件，1表示父控件，以此类推)
 * @param {number} offsetXRatio 相对于父控件宽度的x轴比例 (0-1之间)
 * @param {number} offsetYRatio 相对于父控件高度的y轴比例 (0-1之间)
 * @param {number} timeout 查找控件超时时间
 */
function clickByMatches(_text, parentLevel=0, offsetXRatio=1/2, offsetYRatio=1/2, timeout = 500) {
    // 等待几秒
    logger.log("尝试点击'" + _text + "'按钮")
    var widget = textMatches(_text).findOne(timeout) || descMatches(_text).findOne(timeout) || idMatches(_text).findOne(timeout);
    if (! widget) {
        logger.log("没找到'" + _text + "'控件")
        return false;
    }
    return clickWidget(widget, parentLevel, offsetXRatio, offsetYRatio);
}

/**
 * 点击指定文本的控件的第几层父控件的 x,y位置
 * @param {string} _text 控件文本
 * @param {number} parentLevel 父控件层级 (0表示当前控件，1表示父控件，以此类推)
 * @param {number} offsetXRatio 相对于父控件宽度的x轴比例 (0-1之间)
 * @param {number} offsetYRatio 相对于父控件高度的y轴比例 (0-1之间)
 * @param {number} timeout 查找控件超时时间
 * @returns {boolean} 是否成功点击
 */
function clickByText(_text, parentLevel=0, offsetXRatio=1/2, offsetYRatio=1/2, timeout = 500) {
    logger.log("尝试点击'" + _text + "'按钮")
    // 如果_text是英文的话，则使用text()查找控件
    var widget
    if (/^[a-zA-Z_\-]+$/.test(_text)) {
        widget = id(_text).findOne(timeout)
    }
    if (!widget) {
        widget = desc(_text).findOne(timeout) || text(_text).findOne(timeout);
    }
    if (! widget) {
        logger.log("没找到'" + _text + "'控件")
        return false;
    }
    return clickWidget(widget, parentLevel, offsetXRatio, offsetYRatio);
}

/**
 * 获取当前节点下面的所有文本
 * @param node
 * @param parentLevel
 * @returns {string}
 */
function getTextsUnderNode(node, parentLevel=0) {
    let content = "";
    let parent = node;

    for (let i = 0; i < parentLevel; i++) {
        if (parent && parent.parent()) {
            parent = parent.parent();
        } else {
            logger.log("没找到控件的" + parentLevel + "层父控件");
            return content;
        }
    }
    
    if (parent.childCount() > 0) {
        for (let i = 0; i < parent.childCount(); i++) {
            let child = parent.child(i);
            if (child.childCount() > 0) {
                content = content + getTextsUnderNode(child);
            } else {
                if (child.text()) {
                    content = content + child.text().trim();
                }
            }
        }
    } else {
        content = content + parent.text().trim();
    }
    logger.log("获取到的文本内容：" + content);
    return content;
}

/**
 * 下滑查找元素，如果出现则停止，否则继续下滑，最大下滑几个屏幕高
 * @param _text
 * @param maxScrolls 下滑次数
 * @returns {boolean}
 */
function scrollDownFindElement(_text, maxScrolls = 3) {
    let scrolls = 0;
    while (scrolls < maxScrolls) {
        if (_text instanceof RegExp) {
            // 提取正则表达式字面量
            if (textMatches(_text).exists() && textMatches(_text).findOne().visibleToUser()) {
                logger.log("通过正则找到元素：" + _text);
                return true;
            }
            if (descMatches(_text).exists() && descMatches(_text).findOne().visibleToUser()) {
                logger.log("通过正则找到元素：" + _text);
                return true;
            }
        } else {
            if (text(_text).exists() && text(_text).findOne().visibleToUser()) {
                logger.log("找到元素：" + _text);
                return true;
            }
            if (desc(_text).exists() && desc(_text).findOne().visibleToUser()) {
                logger.log("找到元素：" + _text);
                return true;
            }
        }
        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 8, 500)
        sleep(5000);
        scrolls++;
    }
    logger.log("未找到元素：" + _text);
    return false;
}

/**
* 检测并关闭弹窗
* @returns {boolean} 是否成功关闭弹窗
*/
function closePopup() {
    const list = className('android.widget.TextView').clickable().find().toArray()
        .concat(className('android.widget.ImageView').clickable().find().toArray());
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (!item.text() && item.visibleToUser()) {
            logger.log("尝试关闭弹窗");
            if (item.click()) {
                logger.log("尝试关闭弹窗，点击成功");
            }
        }
    }
}

/**
 * 向右滑动
 * @param {number} y 滑动的y坐标，默认为屏幕高度的一半
 * @param {number} duration 滑动持续时间，默认为200毫秒
 */
function swipeRight(y, duration) {
    swipe(device.width / 4, y || device.height / 2, device.width / 4 * 3, y || device.height / 2, duration || 200)
}

/**
 * 向左滑动
 * @param {number} y 滑动的y坐标，默认为屏幕高度的一半
 * @param {number} duration 滑动持续时间，默认为200毫秒
 */
function swipeLeft(y, duration) {
    swipe(device.width / 4 * 3, y || device.height / 2, device.width / 4, y || device.height / 2, duration || 200)
}

/**
 * 向下滑动（手指向上划）
 * @param {number} x 滑动的x坐标，默认为屏幕宽度的3/4处
 * @param {number} duration 滑动持续时间，默认为200毫秒
 */
function swipeBottom(x, duration) {
    swipe(x || device.width / 4 * 3, device.height / 4, x || device.width / 5 * 4, device.height / 4 * 3, duration || 200)
}

/**
 * 向上滑动（手指向下划）
 * @param {number} x 滑动的x坐标，默认为屏幕宽度的3/4处
 * @param {number} duration 滑动持续时间，默认为200毫秒
 */
function swipeTop(x, duration) {
    swipe(x || device.width / 4 * 3, device.height / 4 * 3, x || device.width / 5 * 4, device.height / 4, duration || 200)
}

/**
 * 打开小程序
 * @param {string} name 小程序名称
 */
function openMiniProgram(name) {
    launch("com.tencent.mm");
    sleep(5000)
    text("微信").findOne(5000)
    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 2 + 2000, 300)
    sleep(2000)
    if (!text(name).exists()) {
      clickByText("更多")
    }
    sleep(2000)
    if (text(name).exists()) {
      clickByText(name)
      return true
    } else {
      back()
      sleep(1000)
      back()
      logger.log(`没找到小程序: ${name}`)
      return false
    }
}

/**
 * 拒绝小程序消息请求
 */
function rejectMiniProgramMessageRequest() {
    if (text('发送一次以下消息').findOne(5000)) {
      clickByText('拒绝')
    }
}

module.exports = {
    closeApp,
    clickByMatches,
    clickByText,
    clickWidget,
    getTextsUnderNode,
    scrollDownFindElement,
    closePopup,
    swipeRight,
    swipeLeft,
    swipeBottom,
    swipeTop,
    openMiniProgram,
    rejectMiniProgramMessageRequest
};