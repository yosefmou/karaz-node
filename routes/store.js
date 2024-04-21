var express = require('express');
var router = express.Router();
var api = require('../api/client');

router.get('/details/:id', async function (req, res, next) {
  try {
    const details = await api.store.getStoreDetails(req.params.id);
    if (!details) {
      res.redirect('/stores');
      return;
    }

    const storeInfo = details.items[0].store;
    const storeCoupons = details.items;
    const storeFeaturers = details.items[0].store.store_features;
    const pageTitle = 'Karaz - ' + storeInfo.store_title;

    console.log(storeFeaturers)
    console.log(storeCoupons);
    res.render('storeDetails', { pageTitle: pageTitle, storeInfo: storeInfo, storeCoupons: storeCoupons, storeFeaturers: storeFeaturers });
  } catch (error) {
    console.log(error);
  }
});

router.get('/stores/', async function (req, res, next) {
  try {
    const category = req.query.category || null;

    if (category) {
      const currentPage = req.query.page || 1;
      const stores = await api.store.getStoresByCategory(currentPage, category);
      const categories = await api.general.getCategories();

      const maxLength = 180;
      stores.items.forEach(store => {
        if (store.store_description.length > maxLength) {
          store.store_description = store.store_description.substring(0, maxLength) + '...';
        }
      });

      const pageTitle = 'Karaz - Stores';
      res.render('stores', {
        pageTitle: pageTitle,
        stores: stores.items,
        categories: categories,
        totalPages: stores.total_pages,
        currentPage: currentPage,
        currentCategory: category
      });
      return;
    }


    const currentPage = req.query.page || 1;
    const stores = await api.store.getStores(currentPage);
    const categories = await api.general.getCategories();

    const maxLength = 180;
    stores.items.forEach(store => {
      if (store.store_description.length > maxLength) {
        store.store_description = store.store_description.substring(0, maxLength) + '...';
      }
    });

    const pageTitle = 'Karaz - Stores';
    res.render('stores', {
      pageTitle: pageTitle,
      stores: stores.items,
      categories: categories,
      totalPages: stores.total_pages,
      currentPage: currentPage,
      currentCategory: null
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
