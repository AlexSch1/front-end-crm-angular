import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IPosition} from "../../../../shared/interfacces";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PositionsCtrlService} from "../../../../backend-bridge/positions-ctrl/positions-ctrl.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit {
  public categoryId: string;
  public form: FormGroup;
  public positionId: string = null;
  constructor(
    public dialogRef: MatDialogRef<PositionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private positionsService: PositionsCtrlService,

              private _snackBar: MatSnackBar) {
    console.log(this)
  }

  public onSubmit() {
    this.form.disable();

    const newPosition: IPosition = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    }

    const completed = () => {
      this.form.enable();
      this.form.reset();
    }

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionsService.update(newPosition).subscribe(
        (position: IPosition) => {
          console.log('position0', position)
          this.close(position);
          this.openSnackBar('Позиция обновлена', 'X');
        },
        (error) => {
          this.openSnackBar(error.error.message, 'X');
          this.form.enable();
        },
        completed
      )
    } else {
      this.positionsService.create(newPosition).subscribe(
        (position: IPosition) => {
          this.openSnackBar('Позиция создана', 'X');
          this.close(position);
        },
        (error) => {
          this.openSnackBar(error.error.message, 'X');
          this.form.enable();
        },
        completed
      )
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      cost: [null, [Validators.required, Validators.min(1)]]
    });

    if (this.data.categoryId) {
      this.categoryId = this.data.categoryId;
    }
    if (this.data.position) {
      this.positionId = this.data.positionId;

      this.form.patchValue({
        name: this.data.position.name,
        cost: this.data.position.cost,
      });
    }

  }

  public close(position?: IPosition): void {
    console.log('d', position)
    this.dialogRef.close(position);
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
