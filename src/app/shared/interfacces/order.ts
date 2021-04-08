import { IOrderPosition } from './order-position';

export interface IOrder {
  date?: Date;
  order?: number;
  user?: string;
  list: IOrderPosition[];
  _id?: string;
}
