import { removeAllChildNodes } from './util.js';

const initSlides = function () {
  const slides = document.querySelectorAll('.slide');
  let curSlide = -1;
  const numSlides = slides.length;
  const slideChangedEventListeners = [];

  const enableSlideAnimations = function () {
    setTimeout(() => slides.forEach(s => s.classList.add('animated')), 0);
  };

  const raiseSlideChangedEvent = function (curSlide) {
    slideChangedEventListeners.forEach(listener => listener(curSlide));
  };

  const goToSlide = function (slide) {
    if (curSlide === slide) return;

    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );

    curSlide = slide;
    raiseSlideChangedEvent(curSlide);
  };

  const nextSlide = function () {
    const newSlide = curSlide >= numSlides - 1 ? 0 : curSlide + 1;
    goToSlide(newSlide);
  };

  const prevSlide = function () {
    const newSlide = curSlide <= 0 ? numSlides - 1 : curSlide - 1;
    goToSlide(newSlide);
  };

  return {
    nextSlide,
    prevSlide,
    goToSlide,
    enableSlideAnimations,
    addSlideChangedEventListener: listener =>
      slideChangedEventListeners.push(listener),
    getNumSlides: () => numSlides,
  };
};

const initDots = function (numSlides, goToSlide) {
  const dotContainer = document.querySelector('.dots');

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const createDots = function () {
    removeAllChildNodes(dotContainer);
    [...Array(numSlides).keys()].forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const addDotClickHandlers = function () {
    dotContainer.addEventListener('click', function (e) {
      if (!e.target.classList.contains('dots__dot')) return;

      const slide = parseInt(e.target.dataset.slide);
      goToSlide(slide);
      activateDot(slide);
    });
  };

  createDots();
  addDotClickHandlers();

  return { activateDot };
};

const initNextBackButtons = function (nextSlide, prevSlide) {
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
};

const initSlider = function () {
  const slides = initSlides();

  const dots = initDots(slides.getNumSlides(), slides.goToSlide);
  slides.addSlideChangedEventListener(curSlide => dots.activateDot(curSlide));

  initNextBackButtons(slides.nextSlide, slides.prevSlide);

  slides.goToSlide(0);
  slides.enableSlideAnimations();
  dots.activateDot(0);
};

export { initSlider };
