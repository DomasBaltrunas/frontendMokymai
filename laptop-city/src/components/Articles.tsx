import './Articles.css';
import { IArticle } from '../api';
import { FC } from 'react';

interface IArticlesProps {
  articles: IArticle[];
}

const Articles: FC<IArticlesProps> = ({ articles }) => {
  return (
    <div className="articles">
      {articles &&
        articles.map(article => <Article key={article.id} article={article} />)}
    </div>
  );
};

interface IArticleProps {
  article: IArticle;
}

const Article: FC<IArticleProps> = ({ article }) => {
  return (
    <div className="article card">
      <img src={article.image} alt="Article" className="image card-img-top" />
      <div className="card-body">
        <h6 className="name card-title">{article.name}</h6>
        <p className="description card-text">{article.description}</p>
        <a
          href={`#article-${article.id}`}
          className="btn btn-primary stretched-link"
        >
          Details
        </a>
      </div>
    </div>
  );
};

export { Articles };
