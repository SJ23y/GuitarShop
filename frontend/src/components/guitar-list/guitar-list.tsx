import GuitarItem from "../guitar-item/guitar-item";

function GuitarList(): JSX.Element {
  return(

    <ul className="catalog-cards__list">
      <GuitarItem />
      <GuitarItem />
      <GuitarItem />
      <GuitarItem />
      <GuitarItem />
      <GuitarItem />
      <GuitarItem />
    </ul>
  );
}

export default GuitarList;
