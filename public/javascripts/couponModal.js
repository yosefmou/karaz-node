document.addEventListener('DOMContentLoaded', function() {
  // Check if modal exists before initializing
  const modal = document.getElementById('couponModal');
  if (!modal) return; // Exit if modal doesn't exist on this page
  
  const closeBtn = document.getElementById('closeCouponModal');
  let redirectTimeout;
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('bg-black/50')) {
      hideModal();
    }
  });

  // Close modal with close button
  closeBtn.addEventListener('click', () => {
    clearTimeout(redirectTimeout);
    hideModal();
  });

  // Only initialize copy & shop buttons if they exist
  const copyShopButtons = document.querySelectorAll('.copy-shop-btn');
  if (copyShopButtons.length > 0) {
    copyShopButtons.forEach(button => {
      button.addEventListener('click', async function() {
        const couponData = {
          code: this.dataset.couponCode,
          storeName: this.dataset.storeName,
          storeLogo: this.dataset.storeLogo,
          description: this.dataset.description,
          shopLink: this.dataset.shopLink,
          terms: JSON.parse(this.dataset.terms || '[]')
        };
        
        showModal(couponData);
        await copyCouponCode(couponData.code, couponData.shopLink);
      });
    });
  }

  // Only initialize shop now button if it exists
  const shopNowBtn = document.getElementById('couponShopLink');
  if (shopNowBtn) {
    shopNowBtn.addEventListener('click', function(e) {
      e.preventDefault();
      clearTimeout(redirectTimeout);
      window.open(this.href, '_blank');
      hideModal();
    });
  }

  async function copyCouponCode(code, shopLink) {
    const counterDiv = document.getElementById('redirectCounter');
    
    try {
      await navigator.clipboard.writeText(code);
      
      // Start countdown
      let secondsLeft = 10;
      
      const updateCounter = () => {
        counterDiv.textContent = `Redirecting to shop in ${secondsLeft} seconds`;
        secondsLeft--;
        
        if (secondsLeft < 0) {
          window.open(shopLink, '_blank');
          hideModal();
        }
      };
      
      updateCounter();
      redirectTimeout = setInterval(() => {
        updateCounter();
      }, 1000);
      
      setTimeout(() => {
        clearInterval(redirectTimeout);
      }, 10000);
      
    } catch (err) {
      console.error('Failed to copy code:', err);
      counterDiv.textContent = 'Failed to copy code. Please try again.';
    }
  }

  function showModal(couponData) {
    document.getElementById('couponStoreLogo').src = couponData.storeLogo;
    document.getElementById('couponStoreName').textContent = couponData.storeName;
    document.getElementById('couponDescription').textContent = couponData.description;
    document.getElementById('couponCode').textContent = couponData.code;
    document.getElementById('couponShopLink').href = couponData.shopLink;
    
    // Handle terms and conditions
    const termsList = document.getElementById('termsConditionsList');
    termsList.innerHTML = ''; // Clear existing terms
    
    // Add new terms
    if (couponData.terms && couponData.terms.length > 0) {
      couponData.terms.forEach(term => {
        const li = document.createElement('li');
        li.textContent = term.termValue;
        termsList.appendChild(li);
      });
    }
    
    // Reset counter
    const counterDiv = document.getElementById('redirectCounter');
    counterDiv.textContent = '';
    
    modal.classList.remove('hidden');
  }

  function hideModal() {
    clearTimeout(redirectTimeout);
    modal.classList.add('hidden');
  }
}); 