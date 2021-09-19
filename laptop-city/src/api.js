const fetchBody = url => fetch(url).then(response => response.json());
const fetchFromLiveServer = path => fetchBody('http://localhost:3001' + path);
const fetchArticles = () => fetchFromLiveServer('/articles');
const fetchFeaturedArticles = () => fetchFromLiveServer('/featuredArticles');

export { fetchArticles, fetchFeaturedArticles };
