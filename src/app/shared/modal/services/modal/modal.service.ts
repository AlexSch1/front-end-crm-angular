import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '../../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService implements OnDestroy {
  public dialogRef: MatDialogRef<ModalComponent>;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog) {}

  openDialog(message: string, confirm: boolean = false): void {
    this.dialogRef = this.dialog.open(ModalComponent, {
      minWidth: '350px',
      maxHeight: '95vh',
      maxWidth: 'auto',
      data: { message, confirm },
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
