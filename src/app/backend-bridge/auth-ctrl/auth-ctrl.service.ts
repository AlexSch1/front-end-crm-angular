import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../shared/interfacces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthCtrlService {

  constructor(private http: HttpClient) {}

  public login(user: IUser): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('api/auth/login', user);
  }

  public register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('api/auth/register', user)
  }
}
