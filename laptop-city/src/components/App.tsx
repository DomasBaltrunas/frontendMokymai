import { useState, useEffect, FC } from 'react';
import { fetchArticles, fetchFeaturedArticles, IArticle } from '../api';
import './App.css';
import { Header } from './Header';
import { Slider } from './Slider';
import { Articles } from './Articles';
import { Footer } from './Footer';
import { Modals } from './Modals';

const App: FC<{}> = props => {
  const [apiData, setApiData] = useState<IApiData>({
    articles: [],
    featuredArticles: [],
  });
  const [apiDataVer, setApiDataVer] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const articles = await fetchArticles();
      const featuredArticles = await fetchFeaturedArticles();
      setApiData({ articles, featuredArticles });
    }

    fetchData();
  }, [apiDataVer]);

  const refreshArticles = function () {
    setApiDataVer(apiDataVer + 1);
  };

  const calcFeaturedArticles = function (
    articles: IArticle[],
    featuredArticles: number[]
  ): IArticle[] {
    return featuredArticles
      .map(featuredArticleId =>
        articles.find(article => article.id === featuredArticleId)
      )
      .filter(featuredArticle => !!featuredArticle) as IArticle[];
  };
  const featuredArticles = calcFeaturedArticles(
    apiData.articles,
    apiData.featuredArticles
  );

  return (
    <>
      <Header />
      <main>
        <section>
          <Slider articles={featuredArticles} />
        </section>
        <section>
          <Articles articles={apiData.articles} />
        </section>
      </main>
      <Footer />
      <Modals refreshArticles={refreshArticles} />
    </>
  );
};

export default App;

interface IApiData {
  articles: IArticle[];
  featuredArticles: number[];
}
