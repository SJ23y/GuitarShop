import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/use-app-dispatch";
import { store } from "../../store";
import { getCurrentGuitar } from "../../store/guitar-process/selectors";
import { uploadGuitarById } from "../../store/thunk-actions";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../components/bread-crumbs/bread-crumbs";
import { GuitarType, Setting } from "../../consts";
import classNames from 'classnames';

function Product(): JSX.Element {
  const currentGuitar = useAppSelector(getCurrentGuitar);
  const { guitarId } = useParams();
  const [tabDescriptionStatus, setTabStatus ] = useState<Boolean>(false);

  useEffect(() => {
    if (guitarId && currentGuitar?.id !== guitarId) {
      store.dispatch(uploadGuitarById(guitarId));
    }
  }, [guitarId, currentGuitar]);

  return (
    <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{currentGuitar?.title ?? ''}</h1>
          {currentGuitar && <BreadCrumbs secondElement="Товары" thirdElement={currentGuitar.title} />}
          <div className="product-container">
            <img
              className="product-container__img"
              src={`${Setting.BaseUrl}/uploads/${currentGuitar?.picture}`}
              srcSet={`${Setting.BaseUrl}/uploads/${currentGuitar?.picture} 2x`}
              width="90"
              height="235"
              alt={`${currentGuitar?.title} picture`} />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">
                {currentGuitar?.title}
              </h2>
              <br />
              <br />
              <div className="tabs">
                <a
                  className={
                    classNames({
                      "button button--medium tabs__button": true,
                      "button--black-border": tabDescriptionStatus
                    })
                  }
                  href="#characteristics"
                  onClick={() => setTabStatus(false)}
                  >Характеристики</a>

                <a
                  className={
                    classNames({
                      "button button--medium tabs__button": true,
                      "button--black-border": !tabDescriptionStatus
                    })
                  }

                  href="#description"
                  onClick={() => setTabStatus(true)}
                  >Описание</a>

                <div className="tabs__content" >
                  <table
                    className={classNames({
                      "tabs__table": true,
                      "hidden": tabDescriptionStatus
                    })}
                    id="characteristics">
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{currentGuitar?.articul}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{currentGuitar?.type && GuitarType[currentGuitar.type].client}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{currentGuitar?.stringsNumber} струнная</td>
                    </tr>
                  </table>
                  <p className={classNames({
                      "tabs__product-description": true,
                      "hidden": !tabDescriptionStatus
                  })} id="description">
                    {
                      currentGuitar?.description
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}

export default Product;
