import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AnalyticsCtrlService } from '../../../backend-bridge/analytics-ctrl/analytics-ctrl.service';
import { IAnalyticsPage } from '../../../shared/interfacces';

@Injectable({ providedIn: 'root' })
export class FetchAnalyticsResolver implements Resolve<IAnalyticsPage> {
  constructor(private analyticsService: AnalyticsCtrlService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    return this.analyticsService.getAnalytics();
  }
}
