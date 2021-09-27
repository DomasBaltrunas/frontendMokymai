const fetchBody = (url: string) => fetch(url).then(response => response.json());
const fetchFromLiveServer = <T,>(path: string): Promise<T> =>
  fetchBody('http://localhost:3001' + path);
const fetchArticles = () => fetchFromLiveServer<IArticle[]>('/articles');
const fetchFeaturedArticles = () =>
  fetchFromLiveServer<number[]>('/featuredArticles');

export { fetchArticles, fetchFeaturedArticles };

export interface IArticle {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
}
