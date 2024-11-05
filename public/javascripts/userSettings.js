const userSettings = {
    async getActiveCountries() {
        try {
            const settings = await this.getCurrentSettings();
            const response = await fetch('/api/Countries/ActiveCountries', {
                headers: {
                    'accept': '*/*',
                    'language': settings.language
                }
            });
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error('Failed to fetch active countries:', error);
            return null;
        }
    },

    async getCurrentSettings() {
        const settings = localStorage.getItem('userSettings');
        if (settings) {
            return JSON.parse(settings);
        }
        return await this.setDefaultSettings();
    },

    async setDefaultSettings() {
        try {
            const response = await fetch('/api/settings');
            const defaults = await response.json();
            const defaultSettings = {
                country: defaults.defaultCountry,
                language: defaults.defaultLanguage
            };
            localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
            this.setCookie('userSettings', JSON.stringify(defaultSettings));
            return defaultSettings;
        } catch (error) {
            console.error('Error fetching default settings:', error);
            return null;
        }
    },

    async updateSettings(newSettings) {
        try {
            // Get current settings first
            const currentSettings = await this.getCurrentSettings();
            
            // Create updated settings by merging, not replacing
            const updatedSettings = {
                country: newSettings.country || currentSettings.country,
                language: newSettings.language || currentSettings.language
            };

            // Save to both localStorage and cookies
            localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
            this.setCookie('userSettings', JSON.stringify(updatedSettings));
            
            return updatedSettings;
        } catch (error) {
            console.error('Error updating settings:', error);
            return null;
        }
    },

    setCookie(name, value) {
        const date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }
};

if (typeof window !== 'undefined') {
    window.userSettings = userSettings;
} 