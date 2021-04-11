import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPosition } from '../../../../shared/interfacces';
import { PositionFormComponent } from '../position-form/position-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../../shared/modal/components/modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PositionsCtrlService } from '../../../../backend-bridge/positions-ctrl/positions-ctrl.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.scss'],
})
export class PositionsListComponent implements OnInit {
  @Input('categoryId') public categoryId: string;
  @Input('positions') public positions: IPosition[];
  public displayedColumns: string[] = ['name', 'cost', 'actions'];
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private positionsService: PositionsCtrlService,
  ) {}

  public ngOnInit(): void {}
  public onAddPosition(): void {
    this.openModal();
  }

  openModal(position: IPosition = null) {
    const dialogRef = this.dialog.open(PositionFormComponent, {
      minWidth: '350px',
      maxHeight: '95vh',
      maxWidth: 'auto',
      data: {
        categoryId: this.categoryId,
        positionId: position ? position._id : null,
        position,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((newPosition) => {
        if (!position && newPosition) {
          this.positions = [...this.positions, newPosition.positions];
        }
        if (position && newPosition) {
          this.positions = this.positions.map((item) => {
            if (item._id === newPosition._id) {
              return newPosition;
            }
            return item;
          });
        }
      });
  }

  public onSelectPosition(position: IPosition): void {
    this.openModal(position);
  }

  public onDelete(eo: Event, position: IPosition) {
    eo.stopPropagation();

    this.positionsService.delete(position).subscribe(
      (res) => {
        this.positions = this.positions.filter(
          (item) => item._id !== position._id,
        );
        this.openSnackBar(res.message, 'X');
      },
      (err) => this.openSnackBar(err.error.message, 'X'),
      () => {},
    );
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
