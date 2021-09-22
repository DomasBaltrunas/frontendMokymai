import classNames from 'classnames';
import './Modals.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModalAction,
  closeAllModalsAction,
} from '../state/actions/modalsActions';
import { isAnyModalOpenSelector } from '../state/selectors/isAnyModalOpenSelector';

const Modals = ({ refreshArticles }) => {
  return (
    <>
      <ModalAddArticle refreshArticles={refreshArticles} />
      <ModalRemoveArticle refreshArticles={refreshArticles} />
      <ModalSetFeaturedArticles refreshArticles={refreshArticles} />
      <Overlay />
    </>
  );
};

const ModalAddArticle = ({ refreshArticles }) => {
  const isOpen = useSelector(state => state.modals.addArticle.isOpen);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeModalAction('addArticle'));

  const initialFormState = {
    name: '',
    description: '',
    image: '',
    price: '',
  };
  const [form, setForm] = useState(initialFormState);

  const handleSubmit = async function () {
    await fetch('http://localhost:3001/articles', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        image: form.image,
        price: parseFloat(form.price),
      }),
    });
    refreshArticles();
    setForm(initialFormState);
  };

  return (
    <Modal
      modalClassName="modal-add-article"
      isOpen={isOpen}
      closeModal={closeModal}
      title="Add article"
      content={
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Article name</label>
          <input
            type="text"
            className="input-add-article-name"
            onChange={e => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />
          <label>Description</label>
          <input
            type="text"
            className="input-add-article-description"
            onChange={e => setForm({ ...form, description: e.target.value })}
            value={form.description}
          />
          <label>Price</label>
          <input
            type="text"
            className="input-add-article-price"
            onChange={e => setForm({ ...form, price: e.target.value })}
            value={form.price}
          />
          <label>Image URL</label>
          <input
            type="text"
            className="input-add-article-image"
            onChange={e => setForm({ ...form, image: e.target.value })}
            value={form.image}
          />
          <button className="btn btn-primary btn-submit-add-article">
            Submit
          </button>
        </form>
      }
    />
  );
};

const ModalRemoveArticle = ({ refreshArticles }) => {
  const isOpen = useSelector(state => state.modals.removeArticle.isOpen);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeModalAction('removeArticle'));

  const initialFormState = { articleId: '' };
  const [form, setForm] = useState(initialFormState);

  const handleSubmit = async function () {
    await fetch(`http://localhost:3001/articles/${form.articleId}`, {
      method: 'DELETE',
    });
    refreshArticles();
    setForm(initialFormState);
  };

  return (
    <Modal
      modalClassName="modal-remove-article"
      isOpen={isOpen}
      closeModal={closeModal}
      title="Remove article"
      content={
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Article Id</label>
          <input
            type="text"
            className="input-remove-article-id"
            onChange={e => setForm({ ...form, articleId: e.target.value })}
            value={form.articleId}
          />
          <button className="btn btn-primary btn-submit-remove-article">
            Submit
          </button>
        </form>
      }
    />
  );
};

const ModalSetFeaturedArticles = ({ refreshArticles }) => {
  const isOpen = useSelector(state => state.modals.setFeaturedArticles.isOpen);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeModalAction('setFeaturedArticles'));

  const initialFormState = { featuredArticleIds: '' };
  const [form, setForm] = useState(initialFormState);

  const handleSubmit = async function () {
    var articleIds = form.featuredArticleIds
      .split(',')
      .map(id => parseInt(id))
      .filter(id => isFinite(id));
    await fetch(`http://localhost:3001/featuredArticles`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleIds),
    });
    refreshArticles();
    setForm(initialFormState);
  };

  return (
    <Modal
      modalClassName="modal-set-featured-articles"
      isOpen={isOpen}
      closeModal={closeModal}
      title="Set featured articles"
      content={
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Featured article ids (e.g. 1, 2, 3)</label>
          <input type="text" className="input-set-featured-articles-ids" />
          <button className="btn btn-primary btn-submit-set-featured-articles">
            Submit
          </button>
        </form>
      }
    />
  );
};

const Modal = ({ modalClassName, isOpen, closeModal, title, content }) => {
  return (
    <div
      className={classNames(modalClassName, {
        hidden: !isOpen,
      })}
    >
      <button className="close-modal" onClick={closeModal}>
        &times;
      </button>
      <h1>{title}</h1>
      {content}
    </div>
  );
};

const Overlay = props => {
  const isAnyModalOpen = useSelector(isAnyModalOpenSelector);
  const dispatch = useDispatch();
  const closeAllModals = () => dispatch(closeAllModalsAction());

  return (
    <div
      className={classNames('overlay', { hidden: !isAnyModalOpen })}
      onClick={closeAllModals}
    ></div>
  );
};

export { Modals };
