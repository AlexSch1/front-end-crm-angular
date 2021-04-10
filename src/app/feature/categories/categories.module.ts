import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
