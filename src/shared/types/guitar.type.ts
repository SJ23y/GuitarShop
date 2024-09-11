import { TypeOfGuitar } from "@prisma/client";
export type Guitar = {
  id?: string
  date: Date;
  title: string;
  price: number;
  articul: string;
  description: string;
  picture: string;
  type: TypeOfGuitar;
  stringsNumber: number;
}
