import { memo } from "react";
import { Guitar } from "../../types/guitars";
import GuitarItem from "../guitar-item/guitar-item";

type GuitarListProps = {
  guitars: Guitar[]
}


function GuitarListTemplate(
  {
    guitars
   }: GuitarListProps): JSX.Element {
  return(

    <ul className="catalog-cards__list">
      {
        guitars.map((guitar: Guitar): JSX.Element => (
          <GuitarItem guitar={guitar} key={guitar.id} />
        ))
      }
    </ul>
  );
}

const GuitarList = memo(GuitarListTemplate);

export default GuitarList;
