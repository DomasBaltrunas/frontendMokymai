const initAddArticleModal = function (registerModal, openModal) {
  // Select HTML Elements
  const modalAddArticle = document.querySelector('.modal-add-article');
  const btnAddArticle = document.querySelector('.btn-add-article');
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

  // Attach modal open/close event listener
  btnAddArticle.addEventListener('click', function (e) {
    e.preventDefault();
    openModal(modalAddArticle);
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

  registerModal(modalAddArticle);
};

const initRemoveArticleModal = function (registerModal, openModal) {
  // Select HTML Elements
  const modalRemoveArticle = document.querySelector('.modal-remove-article');
  const btnRemoveArticle = document.querySelector('.btn-remove-article');
  const inputRemoveArticleId = document.querySelector(
    '.input-remove-article-id'
  );
  const btnSubmitRemoveArticle = document.querySelector(
    '.btn-submit-remove-article'
  );

  // Attach modal open/close event listener
  btnRemoveArticle.addEventListener('click', function (e) {
    e.preventDefault();
    openModal(modalRemoveArticle);
  });

  // Remove article modal functionality
  btnSubmitRemoveArticle.addEventListener('click', async function (e) {
    e.preventDefault();
    const articleId = inputRemoveArticleId.value;
    await fetch(`http://localhost:3000/articles/${articleId}`, {
      method: 'DELETE',
    });
  });

  registerModal(modalRemoveArticle);
};

const initSetFeaturedArticlesModal = function (registerModal, openModal) {
  // Select HTML Elements
  const modalSetFeaturedArticles = document.querySelector(
    '.modal-set-featured-articles'
  );
  const btnSetFeaturedArticles = document.querySelector(
    '.btn-set-featured-articles'
  );
  const inputSetFeaturedArticlesIds = document.querySelector(
    '.input-set-featured-articles-ids'
  );
  const btnSubmitSetFeaturedArticles = document.querySelector(
    '.btn-submit-set-featured-articles'
  );

  // Attach modal open/close event listener
  btnSetFeaturedArticles.addEventListener('click', function (e) {
    e.preventDefault();
    openModal(modalSetFeaturedArticles);
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

  registerModal(modalSetFeaturedArticles);
};

const initOverlay = function (registerOverlay, closeModal) {
  // Select HTML Element
  const overlay = document.querySelector('.overlay');

  // Set overlay functionality
  overlay.addEventListener('click', function (e) {
    e.preventDefault();
    closeModal();
  });

  registerOverlay(overlay);
};

const initCloseButtons = function (closeModal) {
  // Select HTML Elements
  const btnsCloseModal = [...document.querySelectorAll('.close-modal')];

  // Set close buttons functionality
  btnsCloseModal.forEach(btnCloseModal =>
    btnCloseModal.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
    })
  );
};

const initModals = function () {
  const elements = {
    modals: [],
    overlay: null,
    registerModal: modal => elements.modals.push(modal),
    registerOverlay: overlay => (elements.overlay = overlay),
  };

  const openModal = function (modal) {
    elements.modals.forEach(modal => modal.classList.add('hidden'));
    elements.overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
  };

  const closeModal = function () {
    elements.modals.forEach(modal => modal.classList.add('hidden'));
    elements.overlay.classList.add('hidden');
  };

  initAddArticleModal(elements.registerModal, openModal);
  initRemoveArticleModal(elements.registerModal, openModal);
  initSetFeaturedArticlesModal(elements.registerModal, openModal);
  initOverlay(elements.registerOverlay, closeModal);
  initCloseButtons(closeModal);
};

export { initModals };
