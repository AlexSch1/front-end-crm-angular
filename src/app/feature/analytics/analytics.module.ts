import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [CommonModule, AnalyticsRoutingModule, MatProgressSpinnerModule],
})
export class AnalyticsModule {}
