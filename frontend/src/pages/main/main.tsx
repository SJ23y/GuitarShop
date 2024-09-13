import BreadCrumbs from "../../components/bread-crumbs/bread-crumbs";
import FilterBox from "../../components/filter-box/filter-box";
import GuitarList from "../../components/guitar-list/guitar-list";
import PaginationBox from "../../components/pagination-box/pagination-box";
import SortingBox from "../../components/sorting-box/sorting-box";

function Main(): JSX.Element {
  return(
    <main className="page-content">
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <BreadCrumbs />
            <div className="catalog">
              <FilterBox />
              <SortingBox />
              <div className="catalog-cards">
                <GuitarList />
              </div>
            </div>

            <button className="button product-list__button button--red button--big">Добавить новый товар</button>
            <PaginationBox />
          </div>
        </section>
      </main>
  );
}

export default Main;
