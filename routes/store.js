var express = require('express');
var router = express.Router();
var api = require('../api/client');
var { formatStores } = require('../utils/formatters');

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

    res.render('storeDetails', { 
      pageTitle,
      storeInfo,
      storeCoupons,
      storeFeaturers
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/stores/', async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const categoryId = parseInt(req.query.categoryId) || null;
    const itemsPerPage = 12;

    // Get all categories regardless of filter
    const allCategoriesData = await api.store.getStores();
    const categories = allCategoriesData?.categories || [];
    const pageImage = allCategoriesData?.imags[0].image || '';
    let stores;
    let ads;

    if (categoryId) {
      const categoryData = await api.store.getStoresByCategory(categoryId);
      stores = categoryData?.stores || [];
      ads = categoryData?.ads || allCategoriesData?.ads;
    } else {
      // Get all stores
      stores = allCategoriesData?.stores || [];
      ads = allCategoriesData?.ads;
    }
    
    if (!stores) {
      res.status(404).send('Stores not found');
      return;
    }

    // Calculate pagination
    const totalStores = stores.length;
    const totalPages = Math.ceil(totalStores / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedStores = stores.slice(startIndex, endIndex);

    const pageTitle = 'Karaz - Stores';
    res.render('stores', {
      pageTitle,
      stores: paginatedStores,
      categories,
      pageImage,
      ads,
      currentPage: page,
      totalPages,
      currentCategoryId: categoryId,
      showCouponModal: false,
    });

  } catch (error) {
    console.error('Error in /stores route:', error);
    next(error);
  }
});

module.exports = router;
