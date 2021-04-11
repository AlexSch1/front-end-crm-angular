import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './components/history/history.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistoryFilterComponent } from './history-filter/history-filter.component';

@NgModule({
  declarations: [HistoryComponent, HistoryListComponent, HistoryFilterComponent],
  imports: [CommonModule, HistoryRoutingModule],
})
export class HistoryModule {}
