import { useRef, useState } from "react";
import BreadCrumbs from "../../components/bread-crumbs/bread-crumbs";
import { useNavigate } from "react-router-dom";
import { AppRoute, DateFormat, GuitarType } from "../../consts";
import dayjs from "dayjs";
import { store } from "../../store";
import { saveNewGuitar } from "../../store/thunk-actions";

function AddItem(): JSX.Element {
  const navigate = useNavigate();
  const [ formDisableStatus, setFormDisableStatus] = useState(false);
  const [picture, setPicture] = useState('')
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDisableForm = (status?: boolean) => {
    if (status) {
      formRef.current?.reset();
      setPicture('');
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
        store.dispatch(saveNewGuitar({
          formData,
          disableForm: (status?: boolean) => handleDisableForm(status)
        }));
      }
    };

  return(
    <main className="page-content">
        <section className="add-item">
          <div className="container">
            <h1 className="add-item__title">Новый товар</h1>
            <BreadCrumbs secondElement="Товары" thirdElement="Новый товар" />
            <form
              ref={formRef}
              className="add-item__form"
              action="#" method="post"
              onSubmit={handleFormSubmit}
              >
              <div className="add-item__form-left">
                <div className="edit-item-image add-item__form-image">
                  <input
                    ref={fileRef}
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    disabled={formDisableStatus}
                    onChange={handleFileChange}
                    hidden  />
                  <div className="edit-item-image__image-wrap">
                    {picture && <img src={picture} alt="uploaded_picture" />}
                  </div>
                  <div className="edit-item-image__btn-wrap">
                    <button
                      className="button button--small button--black-border edit-item-image__btn"
                      type="button"
                      onClick={() =>  fileRef.current && fileRef.current.click()}
                      >Добавить
                    </button>
                    <button
                    className="button button--small button--black-border edit-item-image__btn"
                    type="button"
                    onClick={ handleDeleteImageButtonClick }
                    >Удалить</button>
                  </div>
                </div>
                <div className="input-radio add-item__form-radio">
                  <span>Выберите тип товара</span>
                  <input
                    type="radio"
                    id="guitar"
                    name="type"
                    value={GuitarType.ACUSTIC.server}
                    disabled={formDisableStatus}
                    />
                  <label htmlFor="guitar">Акустическая гитара</label>
                  <input
                    type="radio"
                    id="el-guitar"
                    name="type"
                    value={GuitarType.ELECTRIC.server}
                    disabled={formDisableStatus}
                     />
                  <label htmlFor="el-guitar">Электрогитара</label>
                  <input
                    type="radio"
                    id="ukulele"
                    name="type"
                    value={GuitarType.UKULELE.server}
                    disabled={formDisableStatus}
                     />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
                <div className="input-radio add-item__form-radio">
                  <span>Количество струн</span>
                  <input type="radio" id="string-qty-4" name="stringsNumber" value="4"
                    disabled={formDisableStatus} />
                  <label htmlFor="string-qty-4">4</label>
                  <input type="radio" id="string-qty-6" name="stringsNumber" value="6"
                    disabled={formDisableStatus} />
                  <label htmlFor="string-qty-6">6</label>
                  <input type="radio" id="string-qty-7" name="stringsNumber" value="7"
                    disabled={formDisableStatus} />
                  <label htmlFor="string-qty-7">7</label>
                  <input type="radio" id="string-qty-12" name="stringsNumber" value="12"
                    disabled={formDisableStatus} />
                  <label htmlFor="string-qty-12">12</label>
                </div>
              </div>
              <div className="add-item__form-right">
                <div className="custom-input add-item__form-input">
                  <label><span>Дата добавления товара</span>
                    <input
                    type="text"
                    name="date"
                    value={dayjs().format(DateFormat.GuitarItem)}
                    placeholder="Дата в формате 00.00.0000" readOnly />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input">
                  <label>
                    <span>Введите наименование товара</span>
                    <input type="text" name="title" placeholder="Наименование"
                    disabled={formDisableStatus} />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                  <label>
                    <span>Введите цену товара</span>
                    <input type="number" name="price" placeholder="Цена в формате 00 000"
                    disabled={formDisableStatus} />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input">
                  <label><span>Введите артикул товара</span>
                    <input type="text" name="articul" placeholder="Артикул товара"
                    disabled={formDisableStatus} />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-textarea add-item__form-textarea">
                  <label><span>Введите описание товара</span>
                    <textarea name="description" placeholder=""
                    disabled={formDisableStatus}></textarea>
                  </label>
                  <p>Заполните поле</p>
                </div>
              </div>
              <div className="add-item__form-buttons-wrap">
                <button className="button button--small add-item__form-button" type="submit"
                    disabled={formDisableStatus}>Сохранить изменения</button>
                <button
                className="button button--small add-item__form-button"
                type="button"
                onClick={() => navigate(AppRoute.Main)}
                disabled={formDisableStatus}
                >Вернуться к списку товаров</button>
              </div>
            </form>
          </div>
        </section>
      </main>
  );
}

export default AddItem;
