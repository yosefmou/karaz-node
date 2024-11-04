var express = require('express');
var router = express.Router();
var api = require('../api/client');


router.get('/', async function (req, res, next) {
  try {
    const pageTitle = 'Karaz - Home';
    const homepage = await api.homepage.getHomePage();
    const topCoupons = formatTopCoupons(homepage.topCoupons);

    res.render('index', {
      pageTitle: pageTitle,
      sliders: homepage.images,
      topOffers: homepage.topOffers,
      topStores: homepage.topStores,
      topCoupons: topCoupons,
      ads: homepage.ads
    });
  } catch (error) {
    console.log(error);
  }
});

function formatTopCoupons(coupons) {
  return coupons.map(coupon => {
    let finalValue;
    if (coupon.type === 'Fixed') {
      finalValue = `${coupon.value} ${coupon.currency}`;
    } else {
      finalValue = `${coupon.value}%`;
    }
    return { ...coupon, finalValue };
  });
}

module.exports = router;
