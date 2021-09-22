import './Articles.css';

const Articles = ({ articles }) => {
  return (
    <div className="articles">
      {articles &&
        articles.map(article => <Article key={article.id} article={article} />)}
    </div>
  );
};

const Article = ({ article }) => {
  return (
    <div className="article card">
      <img src={article.image} className="image card-img-top" />
      <div className="card-body">
        <h9 className="name card-title">{article.name}</h9>
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
