import './Header.css';

const Header = ({ openModal }) => {
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
              <ButtonOpenModal
                title="Add article"
                openModal={() => openModal('add-article')}
              />
            </li>
            <li>
              <ButtonOpenModal
                title="Remove article"
                openModal={() => openModal('remove-article')}
              />
            </li>
            <li>
              <ButtonOpenModal
                title="Set featured articles"
                openModal={() => openModal('set-featured-articles')}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const ButtonOpenModal = ({ title, openModal }) => {
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
