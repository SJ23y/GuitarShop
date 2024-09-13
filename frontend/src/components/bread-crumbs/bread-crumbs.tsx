function BreadCrumbs(): JSX.Element {
  return(
    <ul className="breadcrumbs">
      <li className="breadcrumbs__item">
        <a className="link" href="./main.html">Вход</a>
      </li>
      <li className="breadcrumbs__item">
        <a className="link">Товары</a>
      </li>
    </ul>
  );
}

export default BreadCrumbs;
