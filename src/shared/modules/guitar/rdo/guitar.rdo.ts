import { Expose } from 'class-transformer';

export class GuitarRdo {
  @Expose()
  public id: string;

  @Expose()
  public price: number;

  @Expose()
  public title: string;

  @Expose()
  public type: string;

  @Expose()
  public date: string;

  @Expose()
  public picture: string;

  @Expose()
  public description: string;

  @Expose()
  public articul: string;

  @Expose()
  public stringsNumber: number;
}
