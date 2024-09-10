import { GuitarModel } from "./guitarModel.enum";

export type Guitar = {
  date: Date;
  title: string;
  price: number;
  articul: string;
  description: string;
  picture: string;
  type: GuitarModel;
  stringsNumber: number;
}
