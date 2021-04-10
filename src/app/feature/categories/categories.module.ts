import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalModule } from '../../shared/modal/modal.module';
import { PositionsListComponent } from './components/positions-list/positions-list.component';
import { PositionFormComponent } from './components/position-form/position-form.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [CategoriesComponent, CategoryItemComponent, PositionsListComponent, PositionFormComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    CategoriesRoutingModule,
  ],
})
export class CategoriesModule {}
