import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './components';
import { OrderCategoriesComponent } from './components/order-categories/order-categories.component';
import { OrderPositionComponent } from './components/order-position/order-position.component';
import { FetchPositionsResolver } from './resolvers/fetch-positions/fetch-positions.resolver';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      {
        path: '',
        component: OrderCategoriesComponent,
      },
      {
        path: ':id',
        component: OrderPositionComponent,
        resolve: {
          positions: FetchPositionsResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
