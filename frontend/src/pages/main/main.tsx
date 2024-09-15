import {  useEffect, useState } from "react";
import BreadCrumbs from "../../components/bread-crumbs/bread-crumbs";
import FilterBox from "../../components/filter-box/filter-box";
import GuitarList from "../../components/guitar-list/guitar-list";
import PaginationBox from "../../components/pagination-box/pagination-box";
import SortingBox from "../../components/sorting-box/sorting-box";
import { useAppSelector } from "../../hooks/use-app-dispatch";
import { getInitialGuitars, getQuery } from "../../store/main-process/selectors";
import { uploadGuitars } from "../../store/thunk-actions";
import { store } from "../../store";
import { useNavigate } from "react-router-dom";
import { AppRoute, Setting } from "../../consts";

function Main(): JSX.Element {
  const [totalPages, setTotalPages] = useState<number>(Setting.DefaultStartPage)
  const paginationResult = useAppSelector(getInitialGuitars);
  const navigate = useNavigate();
  const query = useAppSelector(getQuery)

  useEffect(() => {
    store.dispatch(uploadGuitars(query));
  }, []);

  useEffect(() => {
    if (paginationResult && totalPages !== paginationResult.totalPages) {
      setTotalPages(paginationResult.totalPages)
    }
  }, [paginationResult]);

  return(
    <main className="page-content">
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <BreadCrumbs secondElement="Товары"  />
            <div className="catalog">
              <FilterBox />
              <SortingBox />
              <div className="catalog-cards">
              {paginationResult?.entities.length && <GuitarList guitars={paginationResult.entities} />}
              </div>
            </div>

            <button
              className="button product-list__button button--red button--big"
              onClick={() => navigate(AppRoute.Add)}
            >Добавить новый товар</button>
            <PaginationBox totalPages={totalPages} />
          </div>
        </section>
      </main>
  );
}

export default Main;
