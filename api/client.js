const axios = require('axios');
const FormData = require('form-data');
const baseUrl = 'https://likecoupon.softwarus.com/api';
const headers = {
    'Lang': 'en'
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
                    {
                        name: 'Categories', url: '/categories', subCategories: [
                            { name: 'Home', url: '/' },
                            { name: 'Daily Deals', url: '/daily-deals' },
                            { name: 'Advertise With Us', url: '/advertise-with-us' },
                            { name: 'Contact', url: '/contact-us' },
                            { name: 'blog', url: '/blog' },
                            { name: 'Categories', url: '/categories' },
                        ]
                    },
                ],
            }
        },
        getCategories: async () => {
            try {
                const response = await axios.get(baseUrl + '/categories/categories',
                    {
                        headers
                    });
                return response.data.data.items;
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    homepage: {
        getSlider: async () => {
            try {
                const response = await axios.get(baseUrl + '/sliders/sliders', {
                    headers: headers
                });
                return response.data.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        getHomePage: async () => {
            try {
                const response = await axios.get(baseUrl + '/home', {
                    headers: headers
                });
                return response.data.data;
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    store: {
        getStores: async (id) => {
            try {
                const response = await axios.get(baseUrl + `/stores/stores?page=${id}`, {
                    headers: headers
                });
                return response.data.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        getStoresByCategory: async (id, category) => {
            try {
                const data = new FormData();
                data.append('category_id', category);

                const response = await axios.post(baseUrl + `/stores/catStores?page=${id}`, {
                    headers: headers,
                });
                return response.data.data;
            } catch (error) {
                console.log(error);
            }
        },
        getStoreDetails: async (id) => {
            try {
                const data = new FormData();
                data.append('store_id', id);

                const response = await axios.post(baseUrl + '/coupons/coupons', data, {
                    headers: headers,
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
                const response = await axios.get(baseUrl + '/daily-deals/daily-deals');
                return response.data.data;
            } catch (error) {
                console.log(error);
            }
        },
        getDailyDealsByCategory: async (id) => {
            try {
                const response = await axios.get(baseUrl + `/daily-deals/daily-deals/${id}`);
                return response.data.data;
            } catch (error) {
                console.log(error);
            }
        }
    },
};
module.exports = endpoints;
