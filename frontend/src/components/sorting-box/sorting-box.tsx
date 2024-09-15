import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getQuery } from "../../store/main-process/selectors";
import classNames from "classnames";
import { Setting, SortBy, SortDirection } from "../../consts";
import { changeSort } from "../../store/main-process/main-process";
import { uploadGuitars } from "../../store/thunk-actions";
import { store } from "../../store";

function SortingBox(): JSX.Element {
  const query = useAppSelector(getQuery);
  const [sortBy, setSortBy] = useState<SortBy>(Setting.DefaultSortBy);
  const [sortDirection, setSortDirection] = useState<SortDirection>(Setting.DefaultSortDirection);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (sortBy !== query.sortBy) {
      setSortBy(query.sortBy)
    }
    if (sortDirection !== query.sortDirection) {
      setSortDirection(query.sortDirection)
    }
  }, [query]);

  const handleSortByButtonClick = (sortBy: SortBy) => {
    setSortBy(sortBy);
    dispatch(changeSort({sortBy, sortDirection}));
    store.dispatch(uploadGuitars({...query, sortBy, sortDirection}))
  }

  const handleSortDirectionButtonClick = (sortDirection: SortDirection) => {
    setSortDirection(sortDirection);
    dispatch(changeSort({sortBy, sortDirection}));
    store.dispatch(uploadGuitars({...query, sortBy, sortDirection}))
  }

  return(
  <div className="catalog-sort">
    <h2 className="catalog-sort__title">Сортировать:</h2>
    <div className="catalog-sort__type">
      <button
        className={
          classNames({
            "catalog-sort__type-button": true,
            "catalog-sort__type-button--active": sortBy === SortBy.DATE
          })
        }
        onClick={() => handleSortByButtonClick(SortBy.DATE)}
        aria-label="по цене">по дате</button>
      <button
        className={
          classNames({
            "catalog-sort__type-button": true,
            "catalog-sort__type-button--active": sortBy === SortBy.PRICE
          })}
        onClick={() => handleSortByButtonClick(SortBy.PRICE)}
        aria-label="по цене">по цене</button>
    </div>
    <div className="catalog-sort__order">
      <button
        className={
          classNames({
            "catalog-sort__order-button catalog-sort__order-button--up" : true,
            "catalog-sort__order-button--active": sortDirection === SortDirection.UP
          })}
        aria-label="По возрастанию"
        onClick={() => handleSortDirectionButtonClick(SortDirection.UP)}
        ></button>
      <button
        className={
          classNames({
            "catalog-sort__order-button  catalog-sort__order-button--down" : true,
            "catalog-sort__order-button--active": sortDirection === SortDirection.DOWN
          })}
          onClick={() => handleSortDirectionButtonClick(SortDirection.DOWN)}
        aria-label="По убыванию"></button>
    </div>
  </div>);
}

export default SortingBox;
