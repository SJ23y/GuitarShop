import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-dispatch';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { checkAuthentication } from '../../store/user-process/selectors';
import { registerUser } from '../../store/user-process/thunk-actions';

function Register(): JSX.Element {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkAuthentication);
  const navigate = useNavigate();

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (
      emailRef.current !== null &&
      passwordRef.current !== null &&
      nameRef.current !== null
    ) {
      dispatch(
        registerUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          name: nameRef.current.value,
        }),
      );
    }
  };

  if (isAuth) {
    navigate(AppRoute.Main);
  }

  return(
    <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Регистрация</h1>
            <form method="post" action="#" onSubmit={formSubmitHandler}>
              <div className="input-login">
                <label htmlFor="name">Введите имя</label>
                <input ref={nameRef} type="text" id="name" name="name" autoComplete="off" required />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input ref={emailRef} type="email" id="email" name="email" autoComplete="off" required />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="password">Придумайте пароль</label>
                <span>
                  <input ref={passwordRef} type="password" placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" required />
                  <button className="input-login__button-eye" type="button">
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button>
                </span>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
            </form>
          </section>
        </div>
      </main>
  );
}

export default Register;
