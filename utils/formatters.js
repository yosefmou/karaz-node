/**
 * Truncates text to specified length and adds ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Formats coupon value based on type
 * @param {Object} coupon - Coupon object containing type, value and currency
 * @returns {string} Formatted coupon value
 */
function formatCouponValue(coupon) {
  if (coupon.type === 'Fixed') {
    return `${coupon.currency} ${coupon.value}`;
  }
  return `${coupon.value}%`;
}

/**
 * Formats array of coupons with proper value and description
 * @param {Array} coupons - Array of coupon objects
 * @returns {Array} Formatted coupons array
 */
function formatCoupons(coupons) {
  return coupons.map(coupon => ({
    ...coupon,
    finalValue: formatCouponValue(coupon),
    description: truncateText(coupon.description, 112)
  }));
}

/**
 * Formats array of stores
 * @param {Array} stores - Array of store objects
 * @returns {Array} Formatted stores array
 */
function formatStores(stores) {
  return stores.map(store => ({
    ...store,
    description: truncateText(store.description, 60)
  }));
}

/**
 * Formats array of offers
 * @param {Array} offers - Array of offer objects
 * @returns {Array} Formatted offers array
 */
function formatOffers(offers) {
  return offers.map(offer => ({
    ...offer,
    description: truncateText(offer.description, 144)
  }));
}

module.exports = {
  truncateText,
  formatCouponValue,
  formatCoupons,
  formatStores,
  formatOffers
}; 