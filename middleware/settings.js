const api = require('../api/client');
const serverSettings = require('../utils/serverSettings');

async function settingsMiddleware(req, res, next) {
    try {
        // Get user settings
        const settings = serverSettings.getCurrentSettings(req);
        
        // Get countries list
        const countries = await api.general.getActiveCountries(req);
        
        // Make these available to all views
        res.locals.userSettings = settings;
        res.locals.countries = countries;
        
        next();
    } catch (error) {
        console.error('Error in settings middleware:', error);
        next(error);
    }
}

module.exports = settingsMiddleware; 