const productLandingBoxs = document.querySelectorAll(".change-product div"),
  iphoneBox = document.querySelector(".iphone"),
  watchBox = document.querySelector(".watch"),
  bagBox = document.querySelector(".bag");

const productsNames = document.querySelector(".products-names"),
  iphoneName = document.querySelector(".iphone-name"),
  watchName = document.querySelector(".watch-name"),
  bagName = document.querySelector(".bag-name");

const productsDes = document.querySelector(".products-des"),
  iphoneDes = document.querySelector(".iphone-des"),
  watchDes = document.querySelector(".watch-des"),
  bagDes = document.querySelector(".bag-des");

const slides = document.querySelector(".slides"),
  iphoneImg = document.querySelector(".iphone-img"),
  watchImg = document.querySelector(".watch-img"),
  bagImg = document.querySelector(".bag-img");

const offerProducts = document.querySelector(
    ".section-content .con .container .row"
  ),
  offerContent = document.querySelector(".offers .con");

const rightArrowOffers = document.querySelector(".right-arrow"),
  leftArrowOffers = document.querySelector(".left-arrow");

const rightArrowBestSale = document.querySelector(".best-selling .right-arrow"),
  leftArrowBestSale = document.querySelector(".best-selling .left-arrow");

const bestSaleCon = document.querySelector(".best-selling .con");
const bestSaleProducts = document.querySelector(
  ".best-selling .con .container .row"
);

// change data product showed in landing section

// mobile

iphoneBox.addEventListener("click", () => {
  productLandingBoxs.forEach((box) => {
    box.classList.remove("active");
  });
  iphoneBox.classList.add("active");
  productsNames.style.cssText = `transform: translateY(0)`;
  productsDes.style.cssText = `transform: translateY(0)`;
  slides.style.cssText = `transform: translateX(0)`;
});

//watch

watchBox.addEventListener("click", () => {
  productLandingBoxs.forEach((box) => {
    box.classList.remove("active");
  });
  watchBox.classList.add("active");
  let watchSpaceFromTop = watchName.offsetTop;
  let watchSpaceFromTopDes = watchDes.offsetTop;
  let watchSpaceFromLeft = watchImg.offsetLeft + 50;
  productsNames.style.cssText = `transform: translateY(-${watchSpaceFromTop}px)`;
  productsDes.style.cssText = `transform: translateY(-${watchSpaceFromTopDes}px)`;
  slides.style.cssText = `transform: translateX(-${watchSpaceFromLeft}px)`;
});

// bag

bagBox.addEventListener("click", () => {
  productLandingBoxs.forEach((box) => {
    box.classList.remove("active");
  });
  bagBox.classList.add("active");
  let bagSpaceFromTop = bagName.offsetTop;
  let bagSpaceFromTopDes = bagDes.offsetTop;
  let bagSpaceFromLeft = bagImg.offsetLeft + 50;
  productsNames.style.cssText = `transform: translateY(-${bagSpaceFromTop}px)`;
  productsDes.style.cssText = `transform: translateY(-${bagSpaceFromTopDes}px)`;
  slides.style.cssText = `transform: translateX(-${bagSpaceFromLeft}px)`;
});

// offer timer

let seconds = document.querySelector(".seconds span:last-child"),
  minutes = document.querySelector(".minutes span:last-child"),
  days = document.querySelector(".days span:last-child"),
  hours = document.querySelector(".hours span:last-child");

function offerCount() {
  let dateNow = new Date().getTime();
  let offerEnd = new Date("2025").getTime();
  let gap = offerEnd - dateNow;
  let second = Math.floor((gap % (1000 * 60)) / 1000),
    minute = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)),
    hour = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    day = Math.floor(gap / (1000 * 60 * 60 * 24));

  seconds.textContent = second < 10 ? `0${second}` : second;
  minutes.textContent = minute < 10 ? `0${minute}` : minute;
  hours.textContent = hour < 10 ? `0${hour}` : hour;
  days.textContent = day < 10 ? `0${day}` : day;

  if (gap == 0) {
    clearInterval(offerTimer);
  }
}
let offerTimer = setInterval(offerCount, 1000);

// offer products
let reqOfferProducts = new XMLHttpRequest();
reqOfferProducts.open("GET", "offer-products.json");
reqOfferProducts.send();
reqOfferProducts.onreadystatechange = () => {
  if (reqOfferProducts.readyState === 4 && reqOfferProducts.status === 200) {
    let offerProductsData = JSON.parse(reqOfferProducts.responseText);
    offerProductsData.forEach((product) => {
      let {
        image,
        imageOne,
        imageTwo,
        productName,
        productDes,
        sales,
        firstPrice,
        secondPrice,
      } = product;
      let productBox = document.createElement("div");
      productBox.classList.add(
        "col-3",
        "p-2",
        "box",
        "border",
        "border-1",
        "rounded-3",
        "d-flex",
        "flex-column",
        "product"
      );
      productBox.innerHTML = `
                <div class="product-preview text-center position-relative">
                    <img
                      src="${image}"
                      alt="hodi png"
                      loading="lazy"
                      width="200"
                      height='290'
                      class="preview"
                      draggable="false"
                    />
                    <div
                      class="change-img position-absolute top-50 end-0 translate-middle-y"
                    >
                      <div
                        class="rounded-3 d-flex align-items-center justify-content-center"
                      >
                        <img
                          src="${image}"
                          alt="hodi png"
                          loading="lazy"
                          width="35"
                          height='50'
                          class="main-image"
                          draggable="false"
                        />
                      </div>
                      <div
                        class="rounded-3 d-flex align-items-center justify-content-center my-2"
                      >
                        <img
                          src="${imageOne}"
                          alt="hodi png"
                          loading="lazy"
                          width="35"
                          height="50"
                          class="second-image"
                          draggable="false"
                        />
                      </div>
                      <div
                        class="rounded-3 d-flex align-items-center justify-content-center"
                      >
                        <img
                          src="${imageTwo}"
                          alt="hodi png"
                          loading="lazy"
                          width="35"
                          height="50"
                          class="third-image"
                          draggable="false"
                        />
                      </div>
                    </div>
                  </div>
                  <h4 class="fw-bold mt-2 mb-0">${productName}</h4>
                  <div class="product-des text-black-50 lh-base">
                    ${productDes}
                  </div>
                  <div class="rate d-flex gap-1 mt-2">
                    <i
                      class="bi bi-star-fill"
                      style="color: var(--bs-yellow)"
                    ></i>
                    <i
                      class="bi bi-star-fill"
                      style="color: var(--bs-yellow)"
                    ></i>
                    <i
                      class="bi bi-star-fill"
                      style="color: var(--bs-yellow)"
                    ></i>
                    <i
                      class="bi bi-star-fill"
                      style="color: var(--bs-yellow)"
                    ></i>
                    <i class="bi bi-star" style="color: var(--bs-yellow)"></i>
                    <div class="sales text-black-50">(${sales})</div>
                  </div>
                  <div class="price my-2 fw-bold">
                  <span class='main-color'>Price : </span>
                  <span class="text-black-50 text-decoration-line-through me-1">${firstPrice}</span>
                  <span>${secondPrice}</span>
                  </div>
                  <div
                    class="buy btn border py-1 w-100 mt-auto fw-bold fast-transition"
                  >
                    Buy It
                  </div>
      `;
      offerProducts.appendChild(productBox);
    });
    // change preview image
    const mainImage = document.querySelectorAll(".main-image"),
      secondImage = document.querySelectorAll(".second-image"),
      thirdImage = document.querySelectorAll(".third-image"),
      previewImage = document.querySelectorAll(".preview");

    for (let i = 0; i < secondImage.length; i++) {
      secondImage[i].addEventListener("click", () => {
        previewImage[i].src = secondImage[i].src;
      });
    }
    for (let i = 0; i < thirdImage.length; i++) {
      thirdImage[i].addEventListener("click", () => {
        previewImage[i].src = thirdImage[i].src;
      });
    }
    for (let i = 0; i < mainImage.length; i++) {
      mainImage[i].addEventListener("click", () => {
        previewImage[i].src = mainImage[i].src;
      });
    }
  }
};

let isDragging = false,
  startScroll,
  startPageX;

let startDrag = (e) => {
  isDragging = true;
  offerContent.classList.add("startDrag");
  startScroll = offerContent.scrollLeft;
  startPageX = e.pageX;
};

let dragging = (e) => {
  if (!isDragging) return;
  offerContent.scrollLeft = startScroll - (e.pageX - startPageX);
};

let stopDrag = () => {
  isDragging = false;
  offerContent.classList.remove("startDrag");
};

offerContent.addEventListener("mousedown", startDrag);
offerContent.addEventListener("mousemove", dragging);
offerContent.addEventListener("mouseup", stopDrag);

// move offer boxs
leftArrowOffers.addEventListener(
  "click",
  () =>
    (offerContent.scrollLeft +=
      document.querySelectorAll(".product")[1].offsetLeft)
);
rightArrowOffers.addEventListener(
  "click",
  () =>
    (offerContent.scrollLeft -=
      document.querySelectorAll(".product")[1].offsetLeft)
);

let productsAds = document.querySelector(".products-ads .container .row");

// fetch best selling products

let bestProductRequest = new XMLHttpRequest();
bestProductRequest.open("GET", "offer-products.json");
bestProductRequest.send();
// console.log(bestProductRequest);
bestProductRequest.onreadystatechange = () => {
  if (bestProductRequest.status == 200 && bestProductRequest.readyState == 4) {
    let bestProductData = JSON.parse(bestProductRequest.responseText);
    bestProductData.forEach((bestSellProduct) => {
      let {
        image,
        imageOne,
        imageTwo,
        productName,
        productDes,
        sales,
        firstPrice,
        secondPrice,
      } = bestSellProduct;
      let product = document.createElement("div");
      product.classList.add(
        "col-6",
        "p-2",
        "box",
        "border",
        "border-1",
        "rounded-3",
        "d-flex",
        "flex-column",
        "best-product"
      );
      product.innerHTML = `
                <div class="product-preview text-center position-relative">
                    <img
                      src="${image}"
                      alt="hodi png"
                      loading="lazy"
                      width="200"
                      height='290'
                      class="preview"
                      draggable = "false"
                    />
                    <div
                      class="change-img position-absolute top-50 end-0 translate-middle-y"
                    >
                      <div
                        class="rounded-3 d-flex align-items-center justify-content-center"
                      >
                        <img
                          src="${image}"
                          alt="hodi png"
                          loading="lazy"
                          width="35"
                          height='50'
                          class="main-image"
                          draggable = "false"
                        />
                      </div>
                      <div
                        class="rounded-3 d-flex align-items-center justify-content-center my-2"
                      >
                        <img
                          src="${imageOne}"
                          alt="hodi png"
                          loading="lazy"
                          width="35"
                          height="50"
                          class="second-image"
                          draggable = "false"
                        />
                      </div>
                      <div
                        class="rounded-3 d-flex align-items-center justify-content-center"
                      >
                        <img
                          src="${imageTwo}"
                          alt="hodi png"
                          loading="lazy"
                          width="35"
                          height="50"
                          class="third-image"
                          draggable = "false"
                        />
                      </div>
                    </div>
                  </div>
                  <h4 class="fw-bold mt-2 mb-0">${productName}</h4>
                  <div class="product-des text-black-50 lh-base">
                    ${productDes}
                  </div>
                  <div class="rate d-flex gap-1 mt-2">
                    <i
                      class="bi bi-star-fill"
                      style="color: var(--bs-yellow)"
                    ></i>
                    <i
                      class="bi bi-star-fill"
                      style="color: var(--bs-yellow)"
                    ></i>
                    <i
                      class="bi bi-star-fill"
                      style="color: var(--bs-yellow)"
                    ></i>
                    <i
                      class="bi bi-star-fill"
                      style="color: var(--bs-yellow)"
                    ></i>
                    <i class="bi bi-star" style="color: var(--bs-yellow)"></i>
                    <div class="sales text-black-50">(${sales})</div>
                  </div>
                  <div class="price my-2 fw-bold">
                  <span class='main-color'>Price : </span>
                  <span class="text-black-50 text-decoration-line-through me-1">${firstPrice}</span>
                  <span>${secondPrice}</span>
                  </div>
                  <div
                    class="buy btn border py-1 w-100 mt-auto fw-bold fast-transition"
                  >
                    Buy It
                  </div>
      `;
      bestSaleProducts.appendChild(product);
    });
    const mainImage = document.querySelectorAll(".main-image"),
      secondImage = document.querySelectorAll(".second-image"),
      thirdImage = document.querySelectorAll(".third-image"),
      previewImage = document.querySelectorAll(".preview");

    for (let i = 0; i < secondImage.length; i++) {
      secondImage[i].addEventListener("click", () => {
        previewImage[i].src = secondImage[i].src;
      });
    }
    for (let i = 0; i < thirdImage.length; i++) {
      thirdImage[i].addEventListener("click", () => {
        previewImage[i].src = thirdImage[i].src;
      });
    }
    for (let i = 0; i < mainImage.length; i++) {
      mainImage[i].addEventListener("click", () => {
        previewImage[i].src = mainImage[i].src;
      });
    }
  }
};

// best sales dragging
startDrag = (e) => {
  isDragging = true;
  bestSaleCon.classList.add("startDrag");
  startScroll = bestSaleCon.scrollLeft;
  startPageX = e.pageX;
};

dragging = (e) => {
  if (!isDragging) return;
  bestSaleCon.scrollLeft = startScroll - (e.pageX - startPageX);
};

stopDrag = () => {
  isDragging = false;
  bestSaleCon.classList.remove("startDrag");
};

bestSaleCon.addEventListener("mousedown", startDrag);
bestSaleCon.addEventListener("mousemove", dragging);
bestSaleCon.addEventListener("mouseup", stopDrag);

// move best sale boxs
leftArrowBestSale.addEventListener(
  "click",
  () =>
    (bestSaleCon.scrollLeft +=
      document.querySelector(".best-product").offsetWidth + 10)
);
rightArrowBestSale.addEventListener(
  "click",
  () =>
    (bestSaleCon.scrollLeft -=
      document.querySelector(".best-product").offsetWidth + 10)
);

// hot products
const previewImageHotProduct = document.querySelector(".hot-product img"),
  imagesContainer = document.querySelector(".hot-product .images-container ");
(imagePositions = document.querySelectorAll(
  ".hot-product .image-position div"
)),
  (leftHotProductArrow = document.querySelector(".hot-product .left-arrow")),
  (rightHotProductArrow = document.querySelector(".hot-product .right-arrow"));

let images = [
  "assets/images/vr-main.png",
  "assets/images/vr-2.png",
  "assets/images/vr-3.png",
];
let i = 0;

rightHotProductArrow.addEventListener("click", () => {
  if (i < 3) {
    i++;
    previewImageHotProduct.src = images[i];
    previewImageHotProduct.setAttribute("id", i);
  } else {
    i = 0;
    i++;
    previewImageHotProduct.src = images[i];
    previewImageHotProduct.setAttribute("id", i);
  }
  if (previewImageHotProduct.id == 0) {
    imagePositions.forEach((imgPosition) => {
      imgPosition.classList.remove("active");
    });
    imagePositions[0].classList.add("active");
  } else if (previewImageHotProduct.id == 1) {
    imagePositions.forEach((imgPosition) => {
      imgPosition.classList.remove("active");
    });
    imagePositions[1].classList.add("active");
  } else if (previewImageHotProduct.id == 2) {
    imagePositions.forEach((imgPosition) => {
      imgPosition.classList.remove("active");
    });
    imagePositions[2].classList.add("active");
  }
});
leftHotProductArrow.addEventListener("click", () => {
  if (i == 0) {
    i = 3;
    i--;
    previewImageHotProduct.src = images[i];
    previewImageHotProduct.setAttribute("id", i);
  } else {
    i--;
    previewImageHotProduct.src = images[i];
    previewImageHotProduct.setAttribute("id", i);
  }
  if (previewImageHotProduct.id == 0) {
    imagePositions.forEach((imgPosition) => {
      imgPosition.classList.remove("active");
    });
    imagePositions[0].classList.add("active");
  } else if (previewImageHotProduct.id == 1) {
    imagePositions.forEach((imgPosition) => {
      imgPosition.classList.remove("active");
    });
    imagePositions[1].classList.add("active");
  } else if (previewImageHotProduct.id == 2) {
    imagePositions.forEach((imgPosition) => {
      imgPosition.classList.remove("active");
    });
    imagePositions[2].classList.add("active");
  }
});

for (let j = 0; j < imagePositions.length; j++) {
  let dot = imagePositions[j];
  dot.addEventListener("click", () => {
    imagePositions.forEach((imgPosition) => {
      imgPosition.classList.remove("active");
    });
    dot.classList.add("active");
    previewImageHotProduct.src = images[j];
  });
}
