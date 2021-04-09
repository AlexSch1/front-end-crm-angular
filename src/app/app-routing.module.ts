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
