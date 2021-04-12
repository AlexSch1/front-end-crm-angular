import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../../shared/interfacces';

@Injectable({
  providedIn: 'root',
})
export class OrderCtrlService {
  constructor(private http: HttpClient) {}

  public create(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>('/api/order', order);
  }

  public fetch(params: any = {}): Observable<IOrder[]> {
    const httpParams = new HttpParams({
      fromObject: params,
    }).set('showSpinner', `${false}`);

    return this.http.get<IOrder[]>('/api/order', {
      params: httpParams,
    });
  }
}
