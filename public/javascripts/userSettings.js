const userSettings = {
  async getActiveCountries() {
    try {
      const response = await fetch('http://165.232.76.152:8000/api/Countries/ActiveCountries', {
        headers: {
          'accept': '*/*',
          'language': 'en'
        }
      });
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Failed to fetch active countries:', error);
      return null;
    }
  },

  async detectUserCountry() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_code.toUpperCase();
    } catch (error) {
      console.error('Failed to detect user country:', error);
      return null;
    }
  },

  async initializeUserSettings() {
    // Check if settings already exist
    const existingSettings = localStorage.getItem('userSettings');
    if (existingSettings) {
      return JSON.parse(existingSettings);
    }

    // Get active countries
    const activeCountries = await this.getActiveCountries();
    if (!activeCountries) {
      return this.setDefaultSettings();
    }

    // Detect user's country
    const userCountryCode = await this.detectUserCountry();
    if (!userCountryCode) {
      return this.setDefaultSettings();
    }

    // Find matching country in active countries
    const userCountry = activeCountries.find(country => 
      country.flag.toLowerCase().includes(`/${userCountryCode.toLowerCase()}.png`)
    );

    const settings = {
      country: userCountry || defaultCountry,
      language: 'en'
    };

    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));
    return settings;
  },

  setDefaultSettings() {
    const settings = {
      country: defaultCountry,
      language: 'en'
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
    return settings;
  },

  getCurrentSettings() {
    const settings = localStorage.getItem('userSettings');
    return settings ? JSON.parse(settings) : this.setDefaultSettings();
  }
};

// Default country configuration
const defaultCountry = {
  id: 182,
  name: "United Arab Emirates",
  flag: "http://165.232.76.152:8000/Karaz-imgs/countries/ae.png"
};

// Initialize settings when the script loads
window.addEventListener('load', () => {
  userSettings.initializeUserSettings();
});

// Make settings available globally
window.userSettings = userSettings; 