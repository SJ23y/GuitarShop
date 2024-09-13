import { Link } from "react-router-dom";
import { AppRoute } from "../../consts";

function Page404(): JSX.Element {
  return(
    <main className="page-content">
        <div className="container">
          <section className="error">
            <h1 className="error__title">404</h1>
            <span className="error__subtitle">Страница не найдена.</span>
            <p className="error__text"> Возможно, страница была удалена или<br />её вовсе не существовало.</p>
            <Link className="button button__error button--small button--black-border" to={AppRoute.Main}>Продолжить покупки</Link>
          </section>
        </div>
      </main>
  );
}

export default Page404;
