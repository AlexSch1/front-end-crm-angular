import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from '../../../shared/interfacces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN: string = null;

  constructor(private http: HttpClient) {}

  public login(user: IUser): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('api/auth/login', user).pipe(
      tap(({ token }) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      }),
    );
  }

  private setToken(token: string) {
    this.TOKEN = token;
  }

  private getToken(): string {
    return this.TOKEN;
  }

  private isAuth(): boolean {
    return !!this.TOKEN;
  }

  private logOut() {
    this.setToken(null);
    localStorage.clear();
  }
}
