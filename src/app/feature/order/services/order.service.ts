import { Injectable } from '@angular/core';
import { IOrderPosition, IPosition } from '../../../shared/interfacces';

@Injectable()
export class OrderService {
  public positions: IOrderPosition[] = [];
  public price: number = 0;
  constructor() {}

  public add(pos: IPosition) {
    const orderPos: IOrderPosition = {
      name: pos.name,
      cost: pos.cost,
      quantity: pos.quantity,
      _id: pos._id,
    };
    const candidate = this.positions.find((p) => p._id === pos._id);
    if (candidate) {
      candidate.quantity += pos.quantity;
    } else {
      this.positions.push(orderPos);
    }

    this.computePrice();
  }

  private computePrice() {
    this.price = this.positions.reduce((total, p) => {
      return (total += p.quantity * p.cost);
    }, 0);
  }

  public remove(order: IOrderPosition) {
    this.positions = this.positions.filter((pos) => {
      return pos._id !== order._id;
    });
    this.computePrice();
  }

  public clear() {
    this.positions = [];
    this.computePrice();
  }
}
