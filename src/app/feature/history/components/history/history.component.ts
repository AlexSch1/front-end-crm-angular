import { Component, OnInit } from '@angular/core';
import { IFilter, IOrder } from '../../../../shared/interfacces';
import { OrderCtrlService } from '../../../../backend-bridge/order-ctrl/order-ctrl.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  public isFilterVisible: boolean = false;
  public filter: IFilter = {};
  public reloading: boolean = false;
  public offset = 0;
  public orders: IOrder[] = [];
  public STEP = 10;
  public limit = this.STEP;
  public noMoreOrders: boolean = false;
  public loadingMore: boolean = false;
  constructor(private ordersService: OrderCtrlService) {}

  ngOnInit(): void {
    this.reloading = true;
    this.fetch();
  }

  public loadMore() {
    this.loadingMore = true;
    this.offset += this.STEP;
    this.fetch();
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit,
    });
    this.ordersService
      .fetch(params)
      .pipe(take(1))
      .subscribe((orders) => {
        this.orders = this.orders.concat(orders);
        this.noMoreOrders = orders.length < this.STEP;
        this.loadingMore = false;
        this.reloading = false;
      });
  }

  public applyFilter(filter: IFilter) {
    this.orders = [];
    this.offset = 0;
    this.reloading = true;
    this.filter = filter;
    this.fetch();
  }

  public getFilterIconColor() {
    if (this.isFiltered()) {
      return 'accent';
    }
    return null;
  }

  public isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
}
