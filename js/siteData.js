import {
  fetchArticles,
  fetchFeaturedArticles,
  removeAllChildNodes,
} from './util.js';

const renderArticles = function (articles) {
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
};

const renderFeaturedArticles = function (articles, featuredArticles) {
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

const loadData = async function () {
  const articlesPromise = fetchArticles();
  const featuredArticlesPromise = fetchFeaturedArticles();

  renderArticles(await articlesPromise);
  renderFeaturedArticles(await articlesPromise, await featuredArticlesPromise);
};

export { loadData };
