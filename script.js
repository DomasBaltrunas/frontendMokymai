const fetchBody = url => fetch(url).then(response => response.json());
const fetchFromLiveServer = path => fetchBody('http://localhost:3000' + path);
const fetchArticles = () => fetchFromLiveServer('/articles');
const fetchFeaturedArticles = () => fetchFromLiveServer('/featuredArticles');

const removeAllChildNodes = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const loadData = async function () {
  const articles = await fetchArticles();
  const articlesContainer = document.querySelector('.articles');
  removeAllChildNodes(articlesContainer);

  for (const article of articles) {
    const articleCardHtml = `
      <div class="article card">
        <img src="${article.image}" class="image card-img-top" />
        <div class="card-body">
          <h9 class="name card-title">${article.name}</h9>
          <p class="description card-text">
            ${article.description}
          </p>
          <a href="#article-${article.id}" class="btn btn-primary stretched-link">Details</a>
        </div>
      </div>`;

    articlesContainer.insertAdjacentHTML('beforeend', articleCardHtml);
  }

  const featuredArticles = await fetchFeaturedArticles();
  const featuredArticlesContainer = document.querySelector('.slides');
  removeAllChildNodes(featuredArticlesContainer);

  for (const featuredArticleId of featuredArticles) {
    const featuredArticle = articles.find(
      article => article.id === featuredArticleId
    );
    const featuredArticleSlideHtml = `
      <div class="slide">
        <div class="article-banner">
          <h6 class="name">${featuredArticle.name}</h6>
          <div class="description-container">
            <blockquote class="description">
              ${featuredArticle.description}
            </blockquote>
            <a href="#article-${featuredArticle.id}" class="read-more">See more...</a>
          </div>
          <div class="image-container">
            <img src="${featuredArticle.image}" class="image" />
            <div class="price-container"><p class="price">${featuredArticle.price} €</p></div>
          </div>
        </div>
      </div>`;

    featuredArticlesContainer.insertAdjacentHTML(
      'beforeend',
      featuredArticleSlideHtml
    );
  }
};

// Slider
const initSlider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const enableSlideAnimations = function () {
    setTimeout(() => slides.forEach(s => s.classList.add('animated')), 0);
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    enableSlideAnimations();

    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

const initModalButtons = function () {
  // Select HTML Elements
  const btnAddArticle = document.querySelector('.btn-add-article');
  const modalAddArticle = document.querySelector('.modal-add-article');
  const inputAddArticleName = document.querySelector('.input-add-article-name');
  const inputAddArticleDescription = document.querySelector(
    '.input-add-article-description'
  );
  const inputAddArticleImage = document.querySelector(
    '.input-add-article-image'
  );
  const inputAddArticlePrice = document.querySelector(
    '.input-add-article-price'
  );
  const btnSubmitAddArticle = document.querySelector('.btn-submit-add-article');

  const btnRemoveArticle = document.querySelector('.btn-remove-article');
  const modalRemoveArticle = document.querySelector('.modal-remove-article');
  const inputRemoveArticleId = document.querySelector(
    '.input-remove-article-id'
  );
  const btnSubmitRemoveArticle = document.querySelector(
    '.btn-submit-remove-article'
  );

  const btnSetFeaturedArticles = document.querySelector(
    '.btn-set-featured-articles'
  );
  const modalSetFeaturedArticles = document.querySelector(
    '.modal-set-featured-articles'
  );
  const inputSetFeaturedArticlesIds = document.querySelector(
    '.input-set-featured-articles-ids'
  );
  const btnSubmitSetFeaturedArticles = document.querySelector(
    '.btn-submit-set-featured-articles'
  );

  const modals = [
    modalAddArticle,
    modalRemoveArticle,
    modalSetFeaturedArticles,
  ];

  const overlay = document.querySelector('.overlay');
  const btnsCloseModal = [...document.querySelectorAll('.close-modal')];

  const openModal = function (modalElement) {
    modals.forEach(modal => modal.classList.add('hidden'));
    modalElement.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    modals.forEach(modal => modal.classList.add('hidden'));
    overlay.classList.add('hidden');
  };

  // Attach modal open/close event listeners
  btnAddArticle.addEventListener('click', function (e) {
    e.preventDefault();
    openModal(modalAddArticle);
  });

  btnRemoveArticle.addEventListener('click', function (e) {
    e.preventDefault();
    openModal(modalRemoveArticle);
  });

  btnSetFeaturedArticles.addEventListener('click', function (e) {
    e.preventDefault();
    openModal(modalSetFeaturedArticles);
  });

  btnsCloseModal.forEach(btnCloseModal =>
    btnCloseModal.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
    })
  );

  overlay.addEventListener('click', function (e) {
    e.preventDefault();
    closeModal();
  });

  // Add article modal functionality
  btnSubmitAddArticle.addEventListener('click', async function (e) {
    e.preventDefault();
    const articleName = inputAddArticleName.value;
    const articleDescription = inputAddArticleDescription.value;
    const articleImage = inputAddArticleImage.value;
    const articlePrice = parseFloat(inputAddArticlePrice.value);
    await fetch('http://localhost:3000/articles', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: articleName,
        description: articleDescription,
        image: articleImage,
        price: articlePrice,
      }),
    });
  });

  // Remove article modal functionality
  btnSubmitRemoveArticle.addEventListener('click', async function (e) {
    e.preventDefault();
    const articleId = inputRemoveArticleId.value;
    await fetch(`http://localhost:3000/articles/${articleId}`, {
      method: 'DELETE',
    });
  });

  // Set featured articles modal functionality
  btnSubmitSetFeaturedArticles.addEventListener('click', async function (e) {
    e.preventDefault();
    var articleIds = inputSetFeaturedArticlesIds.value
      .split(',')
      .map(id => parseInt(id))
      .filter(id => isFinite(id));
    await fetch(`http://localhost:3000/featuredArticles`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleIds),
    });
  });
};

const init = async function () {
  await loadData();
  initSlider();
  initModalButtons();
};
init();
