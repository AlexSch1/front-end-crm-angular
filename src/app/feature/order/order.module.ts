import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { OrderCategoriesComponent } from './components/order-categories/order-categories.component';
import { MatCardModule } from '@angular/material/card';
import { OrderPositionComponent } from './components/order-position/order-position.component';
import { FormsModule } from '@angular/forms';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderService } from './services/order.service';

@NgModule({
  providers: [],
  declarations: [
    OrderComponent,
    OrderCategoriesComponent,
    OrderPositionComponent,
    OrderFormComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    OrderRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class OrderModule {}
