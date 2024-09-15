import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getQuery } from "../../store/main-process/selectors";
import { Setting } from "../../consts";
import { generatePaginationPages } from "../../utils";
import classNames from "classnames";
import { store } from "../../store";
import { uploadGuitars } from "../../store/thunk-actions";
import { changeCurrentPage } from "../../store/main-process/main-process";

type PaginationBoxProps = {
  totalPages: number;
}

function PaginationBox({ totalPages }: PaginationBoxProps): JSX.Element {
  const query = useAppSelector(getQuery);
  const [currentPage, setCurrentPage] = useState<number>(Setting.DefaultStartPage);
  const [pages, setPages] = useState<number[]>(generatePaginationPages(currentPage, totalPages, []));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.page !== currentPage) {
      setCurrentPage(query.page);
      setPages(generatePaginationPages(query.page, totalPages, pages));
    }
  }, [query])

  useEffect(() => {
    console.log(totalPages);
    setPages(generatePaginationPages(currentPage, totalPages, []));
  }, [totalPages])

  const handlePageButtonClick = (page: number) => {
    setCurrentPage(page);
    setPages(generatePaginationPages(page, totalPages, pages));
    dispatch(changeCurrentPage({page}));
    store.dispatch(uploadGuitars({...query, page}));
  }

  return(
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        {
          pages.map((page) => (
            <li className={
                classNames({
                  "pagination__page": true,
                  "pagination__page--active": currentPage === page
                })
              }
            >
              <a
                className="link pagination__page-link"
                href="#"
                onClick={() => handlePageButtonClick(page)}
              >{page}</a>
            </li>
        ))
        }
        { (totalPages > Setting.PaginationPagesCount) &&
          (totalPages < currentPage + 2) &&
          <li className="pagination__page pagination__page--next" id="next">
            <a
              className="link pagination__page-link"
              href="#"
              onClick={() => handlePageButtonClick(currentPage + 1)}
              >Далее</a>
          </li>
        }
      </ul>
    </div>
  );
}

export default PaginationBox;
