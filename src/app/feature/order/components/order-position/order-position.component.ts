import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPosition } from '../../../../shared/interfacces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-position',
  templateUrl: './order-position.component.html',
  styleUrls: ['./order-position.component.scss'],
  providers: [OrderService],
})
export class OrderPositionComponent implements OnInit {
  public positions: IPosition[] = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
  ) {
    this.positions = this.route.snapshot.data.positions;
  }

  public addToOrder(pos: IPosition) {
    this.orderService.add(pos);
    this.openSnackBar('обавлено', 'X');
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {}
}
