const config = require('../config/api.config');

const serverSettings = {
    getCurrentSettings(req) {
        try {
            if (req.cookies.userSettings) {
                return JSON.parse(req.cookies.userSettings);
            }
        } catch (error) {
            console.error('Error parsing user settings:', error);
        }
        
        return {
            country: config.defaultCountry,
            language: config.defaultLanguage
        };
    }
};

module.exports = serverSettings; 