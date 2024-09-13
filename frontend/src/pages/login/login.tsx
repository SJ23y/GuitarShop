//import { FormEvent, useRef } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { Helmet } from 'react-helmet-async';
//import { useAppDispatch, useAppSelector } from '../../hooks/use-app-dispatch';
//import { Link, useNavigate } from 'react-router-dom';
//import { AppRoute, CITIES } from '../../consts';
//import { changeCity } from '../../store/main-process/main-process';
//import { getRandomInteger } from '../../utils';
//import { checkAuthentication } from '../../store/user-process/selectors';
//import { loginUser } from '../../store/user-process/thunk-actions';

import { Link } from "react-router-dom";
import { AppRoute } from "../../consts";

function Login(): JSX.Element {/*
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const passwordTest = /(?=.*\d)(?=.*[a-z])/i;
  const isAuth = useAppSelector(checkAuthentication);
  const navigate = useNavigate();

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (
      emailRef.current !== null &&
      passwordRef.current !== null &&
      passwordTest.test(passwordRef.current.value)
    ) {
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      );
    }
  };

  if (isAuth) {
    navigate(AppRoute.Main);
  }
*/
  return (
    <main className="page-content">
    <div className="container">
      <section className="login">
        <h1 className="login__title">Войти</h1>
        <p className="login__text">Hовый пользователь?
          <Link className="login__link" to={AppRoute.Register}>Зарегистрируйтесь</Link>
          прямо сейчас</p>
        <form method="post" action="/">
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input type="email" id="email" name="email" autoComplete="off" required />
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="passwordLogin">Введите пароль</label><span>
              <input type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off" required />
              <button className="input-login__button-eye" type="button">
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button></span>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <button className="button login__button button--medium" type="submit">Войти</button>
        </form>
      </section>
    </div>
  </main>
  );
}

export default Login;
