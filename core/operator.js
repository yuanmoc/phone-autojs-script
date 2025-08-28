const logger = require("../core/logger.js")("operator");

module.exports = {
    /**
     * 点击指定文本的控件的第几层父控件的 x,y位置
     * @param {string} _text 控件文本
     * @param {number} parentLevel 父控件层级 (0表示当前控件，1表示父控件，以此类推)
     * @param {number} offsetXRatio 相对于父控件宽度的x轴比例 (0-1之间)
     * @param {number} offsetYRatio 相对于父控件高度的y轴比例 (0-1之间)
     * @param {number} timeout 查找控件超时时间
     */
    clickByMatches: function(_text, parentLevel=0, offsetXRatio=1/2, offsetYRatio=1/2, timeout = 500) {
        // 等待几秒
        logger.log("尝试点击'" + _text + "'按钮")
        var widget = textMatches(_text).findOne(timeout) || descMatches(_text).findOne(timeout) || idMatches(_text).findOne(timeout);
        if (! widget) {
            logger.log("没找到'" + _text + "'控件")
            return false;
        }
        // return this.clickWidget(target, parentLevel, offsetXRatio, offsetYRatio);
        let parent = widget;
        for (let i = 0; i < parentLevel; i++) {
            if (parent && parent.parent()) {
                parent = parent.parent();
            } else {
                logger.log("没找到'" + _text + "'控件的" + parentLevel + "层父控件")
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
            logger.log("点击'" + _text + "'按钮")
            return click(clickX, clickY);
        }
        return false;
    },

    /**
     * 点击指定文本的控件的第几层父控件的 x,y位置
     * @param {string} _text 控件文本
     * @param {number} parentLevel 父控件层级 (0表示当前控件，1表示父控件，以此类推)
     * @param {number} offsetXRatio 相对于父控件宽度的x轴比例 (0-1之间)
     * @param {number} offsetYRatio 相对于父控件高度的y轴比例 (0-1之间)
     * @param {number} timeout 查找控件超时时间
     * @returns {boolean} 是否成功点击
     */
    clickByText: function(_text, parentLevel=0, offsetXRatio=1/2, offsetYRatio=1/2, timeout = 500) {
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
        // return this.clickWidget(target, parentLevel, offsetXRatio, offsetYRatio);
        let parent = widget;
        for (let i = 0; i < parentLevel; i++) {
            if (parent && parent.parent()) {
                parent = parent.parent();
            } else {
                logger.log("没找到'" + _text + "'控件的" + parentLevel + "层父控件")
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
            logger.log("点击'" + _text + "'按钮")
            return click(clickX, clickY);
        }
        return false;
    },
    /**
     * 点击指定控件的第几层父控件的 x,y位置
     * @param {object} widget 控件对象
     * @param {number} parentLevel 父控件层级 (0表示当前控件，1表示父控件，以此类推)
     * @param {number} offsetXRatio 相对于父控件宽度的x轴比例 (0-1之间)
     * @param {number} offsetYRatio 相对于父控件高度的y轴比例 (0-1之间)
     * @returns {boolean} 是否成功点击
     */
    clickWidget: function(widget, parentLevel=0, offsetXRatio=1/2, offsetYRatio=1/2) {
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
    },
    /**
    * 检测并关闭弹窗
    * @returns {boolean} 是否成功关闭弹窗
    */
    closePopup: function () {
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
    },

    /**
     * 向右滑动
     * @param {number} y 滑动的y坐标，默认为屏幕高度的一半
     * @param {number} duration 滑动持续时间，默认为200毫秒
     */
    swipeRight(y, duration) {
        swipe(device.width / 4, y || device.height / 2, device.width / 4 * 3, y || device.height / 2, duration || 200)
    },

    /**
     * 向左滑动
     * @param {number} y 滑动的y坐标，默认为屏幕高度的一半
     * @param {number} duration 滑动持续时间，默认为200毫秒
     */
    swipeLeft(y, duration) {
        swipe(device.width / 4 * 3, y || device.height / 2, device.width / 4, y || device.height / 2, duration || 200)
    },

    /**
     * 向下滑动（手指向上划）
     * @param {number} x 滑动的x坐标，默认为屏幕宽度的3/4处
     * @param {number} duration 滑动持续时间，默认为200毫秒
     */
    swipeBottom(x, duration) {
        swipe(x || device.width / 4 * 3, device.height / 4, x || device.width / 5 * 4, device.height / 4 * 3, duration || 200)
    },

    /**
     * 向上滑动（手指向下划）
     * @param {number} x 滑动的x坐标，默认为屏幕宽度的3/4处
     * @param {number} duration 滑动持续时间，默认为200毫秒
     */
    swipeTop(x, duration) {
        swipe(x || device.width / 4 * 3, device.height / 4 * 3, x || device.width / 5 * 4, device.height / 4, duration || 200)
    }
};