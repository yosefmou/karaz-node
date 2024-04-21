var express = require('express');
var router = express.Router();
var api = require('../api/client');

router.get('/daily-deals', async function (req, res, next) {
  try {
    const stores = await api.store.getStores();

    const pageTitle = 'Karaz - Daily Deals';
    res.render('dailyDeals', { pageTitle: pageTitle });
  } catch (error) {
    console.log(error);
    res.render ('error', {message: error.message, error: error});
  }
});

module.exports = router;
