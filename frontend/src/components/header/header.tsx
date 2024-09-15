import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { checkAuthentication, getUserInfo } from "../../store/user-process/selectors";
import { MouseEvent } from "react";
import { logoutUser } from "../../store/user-process/thunk-actions";
function Header(): JSX.Element {
  const isAuth = useAppSelector(checkAuthentication);
  const user = useAppSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoutButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    console.log('logout handler');
    dispatch(logoutUser());
    navigate(AppRoute.Login)
  }

  return(
    <header className="header--admin header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <Link className="header__logo logo" to={AppRoute.Login}>
              <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
              </Link>
            { isAuth &&
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
            }
            {
              !isAuth &&
              <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item"><a className="link main-nav__link" href="#">Каталог</a>
                </li>
                <li className="main-nav__item"><a className="link main-nav__link" href="#">Где купить?</a>
                </li>
                <li className="main-nav__item"><a className="link main-nav__link" href="#">О компании</a>
                </li>
              </ul>
              </nav>
            }
            { isAuth &&
              <div className="header__container">
                  <span className="header__user-name">{user?.name}</span>
                  <Link className="header__link" to={AppRoute.Logout} aria-label="Выход" onClick={handleLogoutButtonClick}>
                    <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-account"></use>
                    </svg>
                    <span className="header__link-text">Выход</span>
                    </Link>
              </div>
            }
            { !isAuth &&
              <div className="header__container">
                <span className="header__user-name">Login</span>
                <Link className="header__link" to={AppRoute.Login} aria-label="Перейти в личный кабинет">
                  <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-account"></use>
                  </svg><span className="header__link-text">Вход</span>
                </Link>
              </div>
            }
          </div>
        </div>
      </header>
  );
}

export default Header;
