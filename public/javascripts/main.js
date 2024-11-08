// onscroll event change logo size
const scrollThreshold = 100; // Adjust this threshold as needed
var logoclass = document.getElementsByClassName("logo")[0];
var logoheight = logoclass.offsetHeight;
window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) {

    logoclass.classList.add('wt_sccroller');
  } else {
    logoclass.classList.remove('wt_sccroller');
  }
}
);

// mobile menu
let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.nav_menu');
let closehamburger = document.querySelector('.close');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('isactive');
  menu.classList.toggle('active');

});

// search bar
let search_btn = document.querySelector('.search-icon');
let search_content = document.getElementById('search-content');
search_btn.addEventListener('click', function () {
  if (search_content.style.display === "none") {
    search_content.style.display = "block";
  } else {
    search_content.style.display = "none";
  }
});

// Banner slider
var bannerSwiper = new Swiper(".banner-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  effect: "fade", // Optional: adds fade transition between slides
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".banner-swiper .swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".banner-swiper .swiper-button-next",
    prevEl: ".banner-swiper .swiper-button-prev",
  },
});

// top coupons slider
var couponSwiper = new Swiper(".coupon_swiper", {
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination1",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 4,
    },
    1500: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  },
});

// top stores slider
var storesSwiper = new Swiper(".stores_swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination2",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 4,
    },
    1500: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  },
});

// top deals slider
var dealsSwiper = new Swiper(".deals_swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination3",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 3,
    },
    1500: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  },
});

// category slider
var categorySwiper = new Swiper(".category_swiper", {
  slidesPerView: 3,
  spaceBetween: 10,
  autoplay: false,
  centerInsufficientSlides: true,
  navigation: {
    nextEl: ".next-cat",
    prevEl: ".prev-cat",
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 8,
    },
    480: {
      slidesPerView: 4,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
    }
  },
  // Enable touch swiping
  touchEventsTarget: 'container',
  touchRatio: 1,
  touchAngle: 45,
  grabCursor: true,
});
