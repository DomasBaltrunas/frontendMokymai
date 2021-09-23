import './Header.css';
import { useDispatch } from 'react-redux';
import { openModalAction } from '../state/actions/modalActions';

const Header = props => {
  return (
    <header className="header">
      <div className="primary">
        <a href="#">
          <img src="img/logo.png" className="logo" alt="logo" />
        </a>
        <nav className="navbar">
          <ul>
            <li>
              <a className="btn btn-primary" href="#search">
                Search
              </a>
            </li>
            <li>
              <a className="btn btn-primary" href="#login">
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="secondary">
        <nav className="navbar">
          <ul>
            <li>
              <ButtonOpenModal title="Add article" modalName="addArticle" />
            </li>
            <li>
              <ButtonOpenModal
                title="Remove article"
                modalName="removeArticle"
              />
            </li>
            <li>
              <ButtonOpenModal
                title="Set featured articles"
                modalName="setFeaturedArticles"
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const ButtonOpenModal = ({ title, modalName }) => {
  const dispatch = useDispatch();
  const openModal = () => dispatch(openModalAction(modalName));
  const openModalHandler = function (e) {
    e.preventDefault();
    openModal();
  };

  return (
    <a className="btn btn-primary" href="#" onClick={openModalHandler}>
      {title}
    </a>
  );
};

export { Header };
