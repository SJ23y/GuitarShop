import { memo, MouseEvent } from "react";
import { Guitar } from "../../types/guitars";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute, DateFormat, Setting } from "../../consts";
import dayjs from "dayjs";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { changeCurrentGuitar } from "../../store/guitar-process/guitar-process";

type GuitarItemProps = {
  guitar: Guitar;
}



function GuitarItemTemplate({
    guitar
  }: GuitarItemProps): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleGuitarItemClick = (evt: MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      dispatch(changeCurrentGuitar(guitar));
      navigate(`${AppRoute.Product}/${guitar.id}`);
    }
    const handleDeleteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      console.log('delete button');
    }
  return(
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={`${Setting.BaseUrl}/uploads/${guitar.picture}`} srcSet={`${Setting.BaseUrl}/uploads/${guitar.picture} 2x`} width="36" height="93" alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
            <Link className="link" to={`${AppRoute.Product}/${guitar.id}`} onClick={handleGuitarItemClick}>
              <p className="catalog-item__data-title">{guitar.title}</p>
            </Link>
            <br />
            <p className="catalog-item__data-date">
              Дата добавления {dayjs(guitar.date).format(DateFormat.GuitarItem)}
            </p>
            <p className="catalog-item__data-price">{guitar.price}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link className="button button--small button--black-border" to={`${AppRoute.Edit}/${guitar.id}`} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар" onClick={handleDeleteButtonClick}>Удалить</button>
      </div>
    </li>
  );
}

const GuitarItem = memo(GuitarItemTemplate);

export default GuitarItem;
