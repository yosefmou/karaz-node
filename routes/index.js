var express = require('express');
var router = express.Router();
var api = require('../api/client');
var { formatCoupons, formatStores, formatOffers } = require('../utils/formatters');
var serverSettings = require('../utils/serverSettings');

router.get('/', async function (req, res, next) {
  try {
    const pageTitle = 'Karaz - Home';
    const homepage = await api.homepage.getHomePage(req);

    res.render('index', {
      pageTitle,
      sliders: homepage.images,
      topOffers: formatOffers(homepage.topOffers),
      topStores: formatStores(homepage.topStores),
      topCoupons: formatCoupons(homepage.topCoupons),
      ads: homepage.ads
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
