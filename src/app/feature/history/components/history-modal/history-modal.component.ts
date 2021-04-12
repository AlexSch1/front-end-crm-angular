import { Component, Inject, OnInit } from '@angular/core';
import { IOrder } from '../../../../shared/interfacces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss'],
})
export class HistoryModalComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'total', 'price'];
  public selectedOrder: IOrder;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  public ngOnInit(): void {
    this.selectedOrder = this.data;
  }

  public computePrice(order: IOrder): number {
    return order.list.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }
}
