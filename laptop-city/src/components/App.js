import React, { useState, useEffect } from 'react';
import { fetchArticles, fetchFeaturedArticles } from '../api';
import './App.css';
import { Header } from './Header';
import { Slider } from './Slider';
import { Articles } from './Articles';
import { Footer } from './Footer';
import { Modals } from './Modals';

const App = props => {
  const [apiData, setApiData] = useState({
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

  const calcFeaturedArticles = function (articles, featuredArticles) {
    if (!articles || !featuredArticles) return null;
    return featuredArticles.map(featuredArticleId =>
      articles.find(article => article.id === featuredArticleId)
    );
  };
  const featuredArticles = calcFeaturedArticles(
    apiData.articles,
    apiData.featuredArticles
  );

  const [openModals, setOpenModals] = useState([]);

  const getIsModalOpen = function (identifier) {
    return openModals.some(openModal => openModal === identifier);
  };

  const getIsAnyModalOpen = function () {
    return openModals?.length > 0;
  };

  const openModal = function (identifier) {
    if (!getIsModalOpen(identifier)) setOpenModals([...openModals, identifier]);
  };

  const closeModal = function (identifier) {
    setOpenModals(openModals.filter(openModal => openModal !== identifier));
  };

  const closeAllModals = function () {
    setOpenModals([]);
  };

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
