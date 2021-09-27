import { useState } from 'react';
import classNames from 'classnames';
import './Slider.css';
import { FC } from 'react';
import { IArticle } from '../api';

interface ISliderProps {
  articles: IArticle[];
}

const Slider: FC<ISliderProps> = ({ articles }) => {
  const [curSlide, setCurSlide] = useState(0);
  const numSlides = articles?.length ?? 0;

  const nextSlide = function () {
    const newSlide = curSlide >= numSlides - 1 ? 0 : curSlide + 1;
    setCurSlide(newSlide);
  };

  const prevSlide = function () {
    const newSlide = curSlide <= 0 ? numSlides - 1 : curSlide - 1;
    setCurSlide(newSlide);
  };

  return (
    <div className="slider">
      <Slides articles={articles} curSlide={curSlide} />
      <Arrow direction="left" onClick={prevSlide} />
      <Arrow direction="right" onClick={nextSlide} />
      <Dots
        numDots={numSlides}
        activeDot={curSlide}
        setActiveDot={setCurSlide}
      />
    </div>
  );
};

interface IArrowProps {
  direction: string;
  onClick: () => void;
}

const Arrow: FC<IArrowProps> = ({ direction, onClick }) => {
  const directionClass = `slider__btn--${direction}`;
  const innerText =
    direction === 'left' ? '←' : direction === 'right' ? '→' : undefined;
  return (
    <button className={`slider__btn ${directionClass}`} onClick={onClick}>
      {innerText}
    </button>
  );
};

interface IDotsProps {
  numDots: number;
  activeDot: number;
  setActiveDot: (activeDot: number) => void;
}

const Dots: FC<IDotsProps> = ({ numDots, activeDot, setActiveDot }) => {
  return (
    <div className="dots">
      {[...Array(numDots)].map((_, i) => (
        <Dot
          key={i}
          isActive={activeDot === i}
          setActive={() => setActiveDot(i)}
        />
      ))}
    </div>
  );
};

interface IDotProps {
  isActive: boolean;
  setActive: () => void;
}

const Dot: FC<IDotProps> = ({ isActive, setActive }) => {
  return (
    <button
      className={classNames('dots__dot', { 'dots__dot--active': isActive })}
      onClick={setActive}
    ></button>
  );
};

interface ISlidesProps {
  articles: IArticle[];
  curSlide: number;
}

const Slides: FC<ISlidesProps> = ({ articles, curSlide }) => {
  return (
    <div className="slides">
      {articles &&
        articles.map((article, i) => (
          <Slide
            key={article.id}
            article={article}
            transform={`translateX(${100 * (i - curSlide)}%)`}
          />
        ))}
    </div>
  );
};

interface ISlideProps {
  article: IArticle;
  transform: string;
}

const Slide: FC<ISlideProps> = ({ article, transform }) => {
  return (
    <div className="animated slide" style={{ transform }}>
      <div className="article-banner">
        <h6 className="name">{article.name}</h6>
        <div className="description-container">
          <blockquote className="description">{article.description}</blockquote>
          <a href={'#article-' + article.id} className="read-more">
            See more...
          </a>
        </div>
        <div className="image-container">
          <img src={article.image} alt="Article" className="image" />
          <div className="price-container">
            <p className="price">{article.price} €</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Slider };
