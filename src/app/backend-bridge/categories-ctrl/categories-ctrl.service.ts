import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICategory, IMessage } from '../../shared/interfacces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesCtrlService {
  constructor(private http: HttpClient) {}

  public fetchCategories(
    showSpinner: boolean = false,
  ): Observable<ICategory[]> {
    const params = new HttpParams().set('showSpinner', `${showSpinner}`);
    return this.http.get<ICategory[]>('/api/category', {
      params,
    });
  }

  public getCategoryById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`/api/category/${id}`);
  }

  public create(name: string, image?: File): Observable<ICategory> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);

    return this.http.post<ICategory>('/api/category', fd);
  }

  public update(id: string, name: string, image?: File): Observable<ICategory> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);

    return this.http.patch<ICategory>(`/api/category/${id}`, fd);
  }

  public delete(id: string): Observable<IMessage> {
    return this.http.delete<IMessage>(`/api/category/${id}`);
  }
}
