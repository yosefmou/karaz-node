
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

// //sub catogory mobile menu
// let back_btn = document.querySelector('.back_btn');
// back_btn.addEventListener('click', function () {
//   document.querySelector(".toggle-input").checked = false;
// });

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
// top coupons slider
var swiper1 = new Swiper(".coupon_swiper", {
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
var swiper2 = new Swiper(".stores_swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  // loop: true,
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
var swiper2 = new Swiper(".deals_swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  // loop: true,
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
      slidesPerView: 4,
      spaceBetween: 20
    }
  },
});

// categorgy slider
var swiper3 = new Swiper(".category_swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  // loop: true,
  autoplay: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 4
    },
    768: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 9,
    },
    1400: {
      slidesPerView: 11,
    }
  },
});

// scratch to revel
var bridges = document.querySelectorAll(".bridge"),
  bridgeCanvases = [],
  brushRadius = (bridges[0].width / 100) * 5,
  img = new Image();

if (brushRadius < 50) {
  brushRadius = 50;
}

img.onload = function () {
  bridges.forEach(function (bridge) {
    var bridgeCanvas = bridge.getContext('2d');
    bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
    bridgeCanvases.push(bridgeCanvas);
  });
};

img.src = "./scratch-revel.svg";

function detectLeftButton(event) {
  if ('buttons' in event) {
    return event.buttons === 1;
  } else if ('which' in event) {
    return event.which === 1;
  } else {
    return event.button === 1;
  }
}

function getBrushPos(xRef, yRef, bridge) {
  var bridgeRect = bridge.getBoundingClientRect();
  return {
    x: Math.floor((xRef - bridgeRect.left) / (bridgeRect.right - bridgeRect.left) * bridge.width),
    y: Math.floor((yRef - bridgeRect.top) / (bridgeRect.bottom - bridgeRect.top) * bridge.height)
  };
}

// Function to check if a specific area of the canvas is scratched
function isScratchedArea(x, y) {
  return true;
}

function drawDot(mouseX, mouseY, bridgeCanvas) {
  bridgeCanvas.beginPath();
  bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
  bridgeCanvas.fillStyle = '#000';
  bridgeCanvas.globalCompositeOperation = "destination-out";
  bridgeCanvas.fill();

  // Check if a specific area of the canvas is scratched
  if (isScratchedArea(mouseX, mouseY)) {
    // If the scratch is revealed, replace z
    var hiddenButtons = document.querySelectorAll('.scratch_btn');
    hiddenButtons.forEach(function (hiddenButton) {
      hiddenButton.style.zIndex = '1';
    });
  }
}

bridges.forEach(function (bridge, index) {
  bridge.addEventListener("mousemove", function (e) {
    var brushPos = getBrushPos(e.clientX, e.clientY, bridge);
    var leftBut = detectLeftButton(e);
    if (leftBut == 1) {
      drawDot(brushPos.x, brushPos.y, bridgeCanvases[index]);
    }
  }, false);

  bridge.addEventListener("touchmove", function (e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
      var brushPos = getBrushPos(touch.pageX, touch.pageY, bridge);
      drawDot(brushPos.x, brushPos.y, bridgeCanvases[index]);
    }
  }, false);
});



// background vectors animation

