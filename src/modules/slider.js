export default function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slides = document.querySelectorAll(slide),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesFied = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector(container);

  let slideIdx = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIdx}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIdx;
  }

  slidesFied.style.width = 100 * slides.length + "%";
  slidesFied.style.display = "flex";
  slidesFied.style.transition = ".5s ease all";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  const indicators = document.createElement("ul"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("carousel-dot");
    if (i == 0) dot.style.opacity = 1;
    indicators.append(dot);
    dots.push(dot);
  }

  function fixIdx() {
    if (slides.length < 10) {
      current.textContent = `0${slideIdx}`;
    } else {
      current.textContent = slideIdx;
    }
  }
  function dotsStyle() {
    dots.forEach((dot) => (dot.style.opacity = 0.5));
    dots[slideIdx - 1].style.opacity = 1;
  }

  function getWidth() {
    return parseFloat(width);
  }

  function getOffset() {
    return getWidth() * (slides.length - 1);
  }

  next.addEventListener("click", () => {
    if (offset == getOffset()) {
      offset = 0;
    } else {
      offset += getWidth();
    }
    slidesFied.style.transform = `translateX(-${offset}px)`;

    if (slideIdx == slides.length) {
      slideIdx = 1;
    } else {
      slideIdx++;
    }
    fixIdx();
    dotsStyle();
  });
  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = getOffset();
    } else {
      offset -= getWidth();
    }
    slidesFied.style.transform = `translateX(-${offset}px)`;

    if (slideIdx == 1) {
      slideIdx = slides.length;
    } else {
      slideIdx--;
    }

    fixIdx();
    dotsStyle();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIdx = slideTo;
      offset = getWidth() * (slideTo - 1);
      slidesFied.style.transform = `translateX(-${offset}px)`;

      fixIdx();
      dotsStyle();
    });
  });

  // showSlides(slideIdx);

  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // function showSlides(idx) {
  //   if (idx > slides.length) {
  //     slideIdx = 1;
  //   }
  //   if (idx < 1) {
  //     slideIdx = slides.length;
  //   }
  //   slides.forEach((item) => (item.style.display = "none"));
  //   slides[slideIdx - 1].style.display = "block";

  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIdx}`;
  //   } else {
  //     current.textContent = slideIdx;
  //   }
  // }

  // function plusSlide(idx) {
  //   showSlides((slideIdx += idx));
  // }

  // prev.addEventListener("click", () => {
  //   plusSlide(-1);
  // });

  // next.addEventListener("click", () => {
  //   plusSlide(1);
  // });
}
