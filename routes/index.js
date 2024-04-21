var express = require('express');
var router = express.Router();
var api = require('../api/client');


router.get('/', async function (req, res, next) {
  try {
    const sliders = await api.homepage.getSlider();
    const pageTitle = 'Karaz - Home';
    const homepage = await api.homepage.getHomePage();

    const maxLength = 180;
    homepage.topStores.forEach(store => {
      if (store.store_description.length > maxLength) {
        store.store_description = store.store_description.substring(0, maxLength) + '...';
      }
    });
    res.render('index', {
      pageTitle: pageTitle,
      sliders: sliders,
      topCoupons: homepage.topCoupons,
      topStores: homepage.topStores,
      topDeals: homepage.topDeals,
      luckyCoupons: homepage.luckyCoupons
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/categories', async function (req, res, next) {
  try {
    const categories = await api.general.getCategories();
    const pageTitle = 'Karaz - Categories';
    res.render('categories', { pageTitle: pageTitle, categories: categories });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
