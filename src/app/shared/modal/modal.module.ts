import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
})
export class ModalModule {}
