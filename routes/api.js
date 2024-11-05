const express = require('express');
const router = express.Router();
const config = require('../config/api.config');

// Settings endpoint
router.get('/settings', function(req, res) {
  res.json({
    defaultCountry: config.defaultCountry,
    defaultLanguage: config.defaultLanguage
  });
});

module.exports = router; 