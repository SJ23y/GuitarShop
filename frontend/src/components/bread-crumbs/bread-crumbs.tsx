import { Link } from "react-router-dom";
import { AppRoute } from "../../consts";

type BreadCrumbsProps = {
  secondElement?: string,
  thirdElement?: string
}

function BreadCrumbs({secondElement, thirdElement}: BreadCrumbsProps): JSX.Element {

  return(
    <ul className="breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Login}>Вход</Link>
      </li>
      {
      secondElement && <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Main}>Товары</Link>
      </li>
      }
      {
      thirdElement &&
      <li className="breadcrumbs__item">
        {thirdElement}
      </li>
      }
    </ul>
  );
}

export default BreadCrumbs;
