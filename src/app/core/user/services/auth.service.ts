import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {first, map, switchMap, tap} from 'rxjs/operators';
import { IUser } from '../../../shared/interfacces/user';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {AuthCtrlService} from "../../../backend-bridge/auth-ctrl/auth-ctrl.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private user$ = new BehaviorSubject<any>(undefined);
  private TOKEN: string = null;

  constructor(private authCtrlService: AuthCtrlService, private cookieService: CookieService, private router: Router) {
    this.setUserMap();
  }

  public login(user: IUser): Observable<{ token: string }> {
    return this.authCtrlService.login(user).pipe(
      tap(({ token }) => {
        this.setUser(token);
      }),
    );
  }

  public register(user: IUser): Observable<IUser> {
    return this.authCtrlService.register(user);
  }

  public isAuth(): boolean {
    return !!this.TOKEN;
  }

  public ifLoadUser() {
    return this.user.pipe(
      first(),
      map((user) => {
        if (!user) {
          this.router.navigateByUrl('/login');
        }
        return !!user;
      }),
    );
  }

  private setUserMap() {
    this.user = this.user$.asObservable().pipe(
      switchMap((user) => {
        const token = this.cookieService.get('token');
        if (token && !user) {
          return this.getUserByToken(token);
        } else {
          return of(user);
        }
      }),
    );
  }

  private getUserByToken(token: string) {
    return of(null).pipe(
      tap(() => {
        this.setUser(true);
      })
    );
  }

  private setUser(token: any) {
    this.cookieService.delete('token', '/');
    if (token) {
      const dayLong = 1000 * 60 * 60 * 24;
      const tomorrow = new Date(Date.now() + dayLong);
      this.cookieService.set('token', token.jwtToken, tomorrow, '/');
    }
    this.user$.next(true);
  }

  private setToken(token: string) {
    this.TOKEN = token;
  }

  private getToken(): string {
    return this.TOKEN;
  }

  private logOut() {
    this.setUser(null);
    this.router.navigateByUrl('/login');
  }
}
