import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {IAnalyticsPage, ICategory, IMessage, IOverviewPage, IPosition} from '../../shared/interfacces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsCtrlService {
  constructor(private http: HttpClient) {}
  public getOverview(): Observable<IOverviewPage> {
    return this.http.get<IOverviewPage>('/api/analytics/overview');
  }
  public getAnalytics(): Observable<IAnalyticsPage> {
    return this.http.get<IAnalyticsPage>('/api/analytics/analytics');
  }
}
