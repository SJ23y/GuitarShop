import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumbs from "../../components/bread-crumbs/bread-crumbs";
import { store } from "../../store";
import dayjs from "dayjs";
import { updateGuitar, uploadGuitarById } from "../../store/thunk-actions";
import { useAppSelector } from "../../hooks/use-app-dispatch";
import { getCurrentGuitar } from "../../store/guitar-process/selectors";
import { AppRoute, DateFormat, GuitarType, Setting } from "../../consts";
import { Guitar } from "../../types/guitars";

function EditItem(): JSX.Element {
  const storedGuitar = useAppSelector(getCurrentGuitar);
  const [currentGuitar, setCurrentGuitar] = useState<Guitar | undefined>((storedGuitar) ? {
    ...storedGuitar
  } : undefined);
  const navigate = useNavigate();
  const [formDisableStatus, setFormDisableStatus] = useState(false);
  const [picture, setPicture] = useState(
    (storedGuitar) ?
    `${Setting.BaseUrl}/uploads/${storedGuitar.picture}` : '');
  const { guitarId } = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (guitarId && guitarId !== storedGuitar?.id) {
      store.dispatch(uploadGuitarById(guitarId));
    } else if (storedGuitar) {
      setCurrentGuitar(storedGuitar);
      setPicture(`${Setting.BaseUrl}/uploads/${storedGuitar.picture}`);
    }
  }, [guitarId, storedGuitar])


  const handleDisableForm = (status?: boolean) => {
    if (status) {
      navigate(`${AppRoute.Product}/${guitarId}`);
    }
    setFormDisableStatus(false);
  };

    const handleFileChange = () => {
      const file = fileRef.current?.files?.[0];
      if (file) {
        setPicture(URL.createObjectURL(file));
      }
    }

    const handleDeleteImageButtonClick = () => {
      if (fileRef.current) {
        fileRef.current.value = '';
        setPicture('');
      }
    }

    const handleFormSubmit = (evt: React.FormEvent) => {
      evt.preventDefault();
      setFormDisableStatus(true);
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        formData.set('date', dayjs().toISOString())
        store.dispatch(updateGuitar({
          formData,
          guitarId: guitarId ?? '',
          disableForm: (status?: boolean) => handleDisableForm(status)
        }));
      }
    };

  return(
    <main className="page-content">
    <section className="edit-item">
      <div className="container">
        <h1 className="edit-item__title">{currentGuitar?.title ?? ''}</h1>
        {currentGuitar && <BreadCrumbs secondElement="Товары" thirdElement={currentGuitar.title} />}
        {
        currentGuitar &&
        <form
          ref={formRef}
          className="edit-item__form"
          action="#"
          method="post"
          onSubmit={handleFormSubmit}
          >
          <div className="edit-item__form-left">
            <div className="edit-item-image edit-item__form-image">
            <input
                    ref={fileRef}
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    disabled={formDisableStatus}
                    hidden  />
              <div className="edit-item-image__image-wrap">
                {
                  picture &&
                  <img
                    className="edit-item-image__image"
                    src={picture}
                    srcSet="img/content/add-item-1@2x.png 2x"
                    width="133" height="332"
                    alt={currentGuitar?.title}
                    />
                }
              </div>
              <div className="edit-item-image__btn-wrap">
                <button
                  className="button button--small button--black-border edit-item-image__btn"
                  type="button"
                  onClick={() =>  fileRef.current && fileRef.current.click()}
                >Заменить
                </button>
                <button
                  className="button button--small button--black-border edit-item-image__btn"
                  type="button"
                  onClick={ handleDeleteImageButtonClick }
                  >Удалить</button>
              </div>
            </div>
            <div className="input-radio edit-item__form-radio">
              <span>Тип товара</span>
              <input
                type="radio"
                id="guitar"
                name="type"
                value={GuitarType.ACUSTIC.server}
                disabled={formDisableStatus}
                checked={currentGuitar?.type === GuitarType.ACUSTIC.server}
                onChange={() => setCurrentGuitar({...currentGuitar, type: GuitarType.ACUSTIC.server})}
              />
              <label htmlFor="guitar">Акустическая гитара</label>
              <input
                type="radio"
                id="el-guitar"
                name="type"
                value={GuitarType.ELECTRIC.server}
                disabled={formDisableStatus}
                checked={currentGuitar?.type === GuitarType.ELECTRIC.server}
                onChange={() => setCurrentGuitar({...currentGuitar, type: GuitarType.ELECTRIC.server})}
               />
              <label htmlFor="el-guitar">Электрогитара</label>
              <input
                type="radio"
                id="ukulele"
                name="type"
                value={GuitarType.UKULELE.server}
                disabled={formDisableStatus}
                checked={currentGuitar?.type === GuitarType.UKULELE.server}
                onChange={() => setCurrentGuitar({...currentGuitar, type: GuitarType.UKULELE.server})}
              />
              <label htmlFor="ukulele">Укулеле</label>
            </div>
            <div className="input-radio edit-item__form-radio">
              <span>Количество струн</span>
              <input
                type="radio"
                id="string-qty-4"
                name="stringsNumber"
                value="4"
                disabled={formDisableStatus}
                checked={currentGuitar?.stringsNumber === 4}
                onChange={() => setCurrentGuitar({...currentGuitar, stringsNumber: 4})}
                />
              <label htmlFor="string-qty-4">4</label>
              <input
                type="radio"
                id="string-qty-6"
                name="stringsNumber"
                value="6"
                disabled={formDisableStatus}
                checked={currentGuitar?.stringsNumber === 6}
                onChange={() => setCurrentGuitar({...currentGuitar, stringsNumber: 6})}
              />
              <label htmlFor="string-qty-6">6</label>
              <input type="radio"
                id="string-qty-7"
                name="stringsNumber"
                value="7"
                disabled={formDisableStatus}
                checked={currentGuitar?.stringsNumber === 7}
                onChange={() => setCurrentGuitar({...currentGuitar, stringsNumber: 7})}
              />
              <label htmlFor="string-qty-7">7</label>
              <input
                type="radio"
                id="string-qty-12"
                name="stringsNumber"
                value="12"
                disabled={formDisableStatus}
                checked={currentGuitar?.stringsNumber === 12}
                onChange={() => setCurrentGuitar({...currentGuitar, stringsNumber: 12})}
              />
              <label htmlFor="string-qty-12">12</label>
            </div>
          </div>
          <div className="edit-item__form-right">
            <div className="custom-input edit-item__form-input">
              <label>
                <span>Дата добавления товара</span>
                <input
                  type="text"
                  name="date"
                  value={dayjs(currentGuitar?.date).format(DateFormat.GuitarItem) ?? ''}
                  placeholder="Дата в формате 00.00.0000"
                  readOnly
                />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label>
                <span>Наименование товара</span>
                <input
                  type="text"
                  name="title"
                  value={currentGuitar?.title}
                  placeholder="Наименование"
                  disabled={formDisableStatus}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => setCurrentGuitar({...currentGuitar, title: evt.target.value})
                }
                  />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input edit-item__form-input--price">
              <label>
                <span>Цена товара</span>
                <input
                  type="number"
                  name="price"
                  value={currentGuitar?.price}
                  placeholder="Цена в формате 00 000"
                  disabled={formDisableStatus}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => setCurrentGuitar({...currentGuitar, price: parseInt(evt.target.value, 10)})}
                />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label>
                <span>Артикул товара</span>
                <input
                  type="text"
                  name="articul"
                  value={currentGuitar?.articul}
                  placeholder="Артикул товара"
                  disabled={formDisableStatus}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => setCurrentGuitar({...currentGuitar, articul: evt.target.value})}
                />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea edit-item__form-textarea">
              <label>
                <span>Описание товара</span>
                <textarea
                name="description"
                placeholder=""
                value={currentGuitar?.description}
                disabled={formDisableStatus}
                onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setCurrentGuitar({...currentGuitar, description: evt.target.value})}
              ></textarea>
              </label>
              <p>Заполните поле</p>
            </div>
          </div>
          <div className="edit-item__form-buttons-wrap">
            <button
              className="button button--small edit-item__form-button"
              type="submit"
              disabled={formDisableStatus}
            >Сохранить изменения</button>
            <button
               className="button button--small edit-item__form-button"
               type="button"
               onClick={() => navigate(AppRoute.Main)}
               disabled={formDisableStatus}
            >Вернуться к списку товаров</button>
          </div>
        </form>
        }
      </div>
    </section>
  </main>
  );
}

export default EditItem;
