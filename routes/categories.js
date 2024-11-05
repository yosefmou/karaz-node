var express = require('express');
var router = express.Router();
var api = require('../api/client');
const { truncateText } = require('../utils/formatters');

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
