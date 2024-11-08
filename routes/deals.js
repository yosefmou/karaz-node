var express = require('express');
var router = express.Router();
var api = require('../api/client');
var { formatOffers } = require('../utils/formatters');

router.get('/daily-deals', async function (req, res, next) {
  try {
    const response = await api.dailyDeals.getDailyDeals();
    if (!response || !response.result) {
      res.status(404).send('Daily deals not found');
      return;
    }

    const dailyDeals = response.result;
    const pageTitle = 'Karaz - Daily Deals';
    
    res.render('dailyDeals', {
      pageTitle,
      topPicks: formatOffers(dailyDeals.topPicks),
      offers: formatOffers(dailyDeals.offers),
      pageImage: dailyDeals.images[0]?.image || '/images/default-banner.jpg',
      ads: dailyDeals.ads,
      showCouponModal: false,
    });

  } catch (error) {
    console.log(error);
    res.render('error', {message: error.message, error: error});
  }
});

module.exports = router;
