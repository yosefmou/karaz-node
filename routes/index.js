var express = require('express');
var router = express.Router();
var api = require('../api/client');
var { formatCoupons, formatStores, formatOffers } = require('../utils/formatters');
var serverSettings = require('../utils/serverSettings');

router.get('/', async function (req, res, next) {
  try {
    const pageTitle = 'Karaz - Home';
    const settings = serverSettings.getCurrentSettings(req);
    const homepage = await api.homepage.getHomePage(req);
    const countries = await api.general.getActiveCountries(req);

    res.render('index', {
      pageTitle,
      countries,
      userSettings: settings,
      sliders: homepage.images,
      topOffers: formatOffers(homepage.topOffers),
      topStores: formatStores(homepage.topStores),
      topCoupons: formatCoupons(homepage.topCoupons),
      ads: homepage.ads
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
