import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ICategory, IMessage, IPosition} from '../../shared/interfacces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionsCtrlService {
  constructor(private http: HttpClient) {}
  public fetchPositions(categoryId: string): Observable<IPosition[]> {
    return this.http.get<IPosition[]>(`/api/position/${categoryId}`);
  }

  public create(position: IPosition): Observable<IPosition> {
    return this.http.post<IPosition>(`/api/position`, position);
  }

  public update(position: IPosition): Observable<IPosition> {
    return this.http.patch<IPosition>(`/api/position/${position._id}`, position);
  }

  public delete(position: IPosition): Observable<IMessage> {
    return this.http.delete<IMessage>(`/api/position/${position._id}`);
  }
}
