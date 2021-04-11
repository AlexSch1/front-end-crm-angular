import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderFormComponent } from '../order-form/order-form.component';
import { IOrder, IOrderPosition } from '../../../../shared/interfacces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderCtrlService } from '../../../../backend-bridge/order-ctrl/order-ctrl.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService],
})
export class OrderComponent implements OnInit {
  @ViewChild('modal', { static: false }) public modalContent: TemplateRef<any>;
  public pending: boolean = false;
  public isRoot: boolean = true;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    public orderService: OrderService,
    private ordersService: OrderCtrlService,
    public dialog: MatDialog,
  ) {}

  openModal() {
    this.dialog.open(OrderFormComponent, {
      minWidth: '350px',
      maxHeight: '95vh',
      maxWidth: 'auto',
      data: this.modalContent,
      autoFocus: false,
    });
  }
  public close(): void {
    this.dialog.closeAll();
  }
  public removePosition(position: IOrderPosition) {
    this.orderService.remove(position);
  }
  public submit() {
    this.pending = true;
    const orders: IOrder = {
      list: this.orderService.positions.map((order) => {
        delete order._id;
        return order;
      }),
    };
    this.ordersService
      .create(orders)
      .pipe()
      .subscribe(
        (newOrder) => {
          this.openSnackBar(`Заказ ${newOrder.order} добавлен.`, 'X');
          this.orderService.clear();
          this.router.navigate(['/order']);
        },
        (error) => {
          this.openSnackBar(error.error.message, 'X');
        },
        () => {
          this.close();
          this.pending = false;
        },
      );
  }
  ngOnInit(): void {
    this.router.events
      .pipe(
        map((event) => event),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        this.isRoot = this.router.url === '/order';
      });
  }
  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
