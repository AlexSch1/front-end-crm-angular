import { Component, Input } from '@angular/core';
import { IOrder } from '../../../../shared/interfacces';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { HistoryModalComponent } from '../history-modal/history-modal.component';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent {
  @Input() public orders: IOrder[];
  public selectedOrder: IOrder;
  public displayedColumns: string[] = [
    'id',
    'data',
    'time',
    'price',
    'actions',
  ];
  constructor(public dialog: MatDialog) {}

  public computePrice(order: IOrder): number {
    return order.list.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }

  public openModal() {
    const dialogRef = this.dialog.open(HistoryModalComponent, {
      minWidth: '80vw',
      maxHeight: '95vh',
      maxWidth: 'auto',
      data: this.selectedOrder,
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.selectedOrder = null;
      });
  }

  public selectOrder(order: IOrder) {
    this.selectedOrder = order;
    this.openModal();
  }
}
