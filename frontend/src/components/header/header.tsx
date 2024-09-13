import { Link } from "react-router-dom";
import { AppRoute } from "../../consts";

function Header(): JSX.Element {
  return(
    <header className="header--admin header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <Link className="header__logo logo" to={AppRoute.Login}>
              <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
              </Link>
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to={AppRoute.Main}>Каталог</Link>
                </li>
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to={AppRoute.Main}>Список товаров</Link>
                </li>
              </ul>
            </nav>
            <div className="header__container">
              <span className="header__user-name">Имя</span>
              <a className="header__link" href="login.html" aria-label="Перейти в личный кабинет">
                <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-account"></use>
                </svg>
                <span className="header__link-text">Вход</span></a>

            </div>
          </div>
        </div>
      </header>
  );
}

export default Header;
