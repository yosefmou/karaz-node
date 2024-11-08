const axios = require('axios');
const config = require('../config/api.config');
const FormData = require('form-data');
const baseUrl = config.newBaseUrl;

// Helper to get headers with country and language
const getHeaders = (req) => {
    try {
        // Check for server-side cookies first
        if (req?.cookies?.userSettings) {
            const settings = JSON.parse(req.cookies.userSettings);
            return {
                'accept': '*/*',
                'country-id': settings?.country?.id || config.defaultCountry.id,
                'language': settings?.language || config.defaultLanguage
            };
        }

        // Then check browser localStorage if available
        if (typeof window !== 'undefined') {
            const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
            return {
                'accept': '*/*',
                'country-id': settings?.country?.id || config.defaultCountry.id,
                'language': settings?.language || config.defaultLanguage
            };
        }

        // Fallback to defaults
        return {
            'accept': '*/*',
            'country-id': config.defaultCountry.id,
            'language': config.defaultLanguage
        };
    } catch (error) {
        console.log('Error getting headers:', error);
        return {
            'accept': '*/*',
            'country-id': config.defaultCountry.id,
            'language': config.defaultLanguage
        };
    }
};

const endpoints = {
    general: {
        getMenuItems: async () => {
            return {
                main: [
                    { name: 'Home', url: '/' },
                    { name: 'Daily Deals', url: '/daily-deals' },
                    { name: 'Advertise With Us', url: '/advertise-with-us' },
                    { name: 'Contact', url: '/contact-us' },
                    { name: 'blog', url: '/blog' },
                    {name: 'Categories', url: '/categories'},
                ],
            }
        },
        getCategories: async () => {
            try {
                const response = await axios.get(baseUrl + '/categories/categories',
                    {
                        headers: getHeaders()
                    });
                return response.data.data.items;
            }
            catch (error) {
                console.log(error);
            }
        },
        getActiveCountries: async (req) => {
            try {
                const response = await axios.get(baseUrl + '/Countries/ActiveCountries', {
                    headers: getHeaders(req)
                });
                return response.data.result;
            } catch (error) {
                console.log('Error fetching active countries:', error);
                return [];
            }
        },
    },
    homepage: {
        getHomePage: async (req) => {
            try {
                const response = await axios.get(baseUrl + '/Home/GetHomeLists', {
                    headers: getHeaders(req)
                });
                return response.data.result;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        },
    },
    store: {
        getStores: async () => {
            try {
                const response = await axios.get(baseUrl + `/Stores/GetStoresLists`, {
                    headers: getHeaders()
                });
                return response.data.result;
            }
            catch (error) {
                console.error('Error fetching stores:', error);
                return null;
            }
        },
        getStoresByCategory: async (categoryId) => {
            try {
                const response = await axios.get(
                    baseUrl + `/Categories/GetCategoryStoresByCountry?categoryId=${categoryId}`, {
                    headers: getHeaders()
                });
                return response.data.result;
            } catch (error) {
                console.error('Error fetching stores by category:', error);
                return null;
            }
        },
        getStoreDetails: async (id) => {
            try {
                const data = new FormData();
                data.append('store_id', id);

                const response = await axios.post(baseUrl + '/coupons/coupons', data, {
                    headers: getHeaders(),
                });

                return response.data.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
    dailyDeals: {
        getDailyDeals: async () => {
            try {
                const response = await axios.get(baseUrl + '/DailyDeals', {
                    headers: getHeaders()
                });
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.log('Error fetching daily deals:', error);
                return null;
            }
        },
        getDailyDealsByCategory: async (id) => {
            try {
                const response = await axios.get(baseUrl + `/DailyDeals/GetDailyDealsByCategory/${id}`, {
                    headers: getHeaders()
                });
                return response.data;
            } catch (error) {
                console.log('Error fetching daily deals by category:', error);
                return null;
            }
        }
    },
};
module.exports = endpoints;
