import { Component, OnInit } from '@angular/core';
import { AnalyticsCtrlService } from '../../../../backend-bridge/analytics-ctrl/analytics-ctrl.service';
import { IOverviewPage } from '../../../../shared/interfacces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public data$: Observable<IOverviewPage>;
  public yesterday: Date = new Date();
  constructor(private analyticsService: AnalyticsCtrlService) {}

  ngOnInit(): void {
    this.data$ = this.analyticsService.getOverview().pipe();

    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }
}
