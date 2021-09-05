const fetchBody = url => fetch(url).then(response => response.json());
const fetchFromLiveServer = path => fetchBody('http://localhost:3000' + path);
const fetchArticles = () => fetchFromLiveServer('/articles');
const fetchFeaturedArticles = () => fetchFromLiveServer('/featuredArticles');

const removeAllChildNodes = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export { fetchArticles, fetchFeaturedArticles, removeAllChildNodes };
