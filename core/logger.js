const appConfig = require('../config/appConfig.js');

module.exports = function(tag='default') {
    return {
        log: function(message) {
            if (appConfig.logEnabled) {
                toastLog(`[${tag}] ${message}`, 'short', 'forcible')
            }
        },
    };
};