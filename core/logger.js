const appConfig = require('../config/appConfig.js');

module.exports = function(tag='default') {
    return {
        log: function(message) {
            if (appConfig.logEnabled) {
                toast(`[${tag}] ${message}`)
                console.log(`[${tag}] ${message}`);
            }
        },
    };
};