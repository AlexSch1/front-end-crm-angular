import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { FetchCategoriesResolver } from '../categories/resolvers';
import { FetchAnalyticsResolver } from './resolvers/fetch-analytics.resolver';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
    resolve: {
      analytics: FetchAnalyticsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
