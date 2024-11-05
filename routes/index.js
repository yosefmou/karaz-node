var express = require('express');
var router = express.Router();
var api = require('../api/client');
var { formatCoupons, formatStores, formatOffers } = require('../utils/formatters');

router.get('/', async function (req, res, next) {
  try {
    const pageTitle = 'Karaz - Home';
    const homepage = await api.homepage.getHomePage();
    const topCoupons = formatCoupons(homepage.topCoupons);
    const topStores = formatStores(homepage.topStores);
    const topOffers = formatOffers(homepage.topOffers);

    res.render('index', {
      pageTitle: pageTitle,
      sliders: homepage.images,
      topOffers: topOffers,
      topStores: topStores,
      topCoupons: topCoupons,
      ads: homepage.ads
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
