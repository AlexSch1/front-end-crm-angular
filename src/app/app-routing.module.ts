import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/user/guards';
import {BaseLayoutComponent} from "./layout/base-layout/components/base-layout";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        loadChildren: () =>
          import('./feature/overview/overview.module').then((m) => m.OverviewModule),
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('./feature/analytics/analytics.module').then((m) => m.AnalyticsModule),
      },
      {
        path: 'history',
        loadChildren: () =>
          import('./feature/history/history.module').then((m) => m.HistoryModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./feature/order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./feature/categories/categories.module').then((m) => m.CategoriesModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
