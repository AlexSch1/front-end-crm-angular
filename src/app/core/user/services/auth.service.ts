import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {AuthCtrlService} from "../../../backend-bridge/auth-ctrl/auth-ctrl.service";
import {IUser} from "../../../shared/interfacces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public user: Observable<any>;
  // private user$ = new BehaviorSubject<any>(undefined);

  public token: Observable<any>;
  private token$ = new BehaviorSubject<any>(undefined);

  constructor(private authCtrlService: AuthCtrlService, private cookieService: CookieService, private router: Router) {
    this.setUserMap();
  }

  public login(user: IUser): Observable<{ token: string }> {
    return this.authCtrlService.login(user).pipe(
      tap((user) => {
        this.setToken(user.token);
        // this.setUser(user.token);
      }),
    );
  }

  public register(user: IUser): Observable<IUser> {
    return this.authCtrlService.register(user);
  }

  public ifLoadUser() {
    // return this.user.pipe(
    //   first(),
    //   map((user) => {
    //     if (!user) {
    //       this.router.navigateByUrl('/login');
    //     }
    //     return !!user;
    //   }),
    // );
    return this.token.pipe(
      first(),
      map((token) => {
        if (!token) {
          this.router.navigateByUrl('/login');
        }
        return !!token;
      }),
    );
  }

  private setUserMap() {
    // this.user = this.user$.asObservable().pipe(
    //   switchMap((user) => {
    //     const token = this.cookieService.get('token');
    //     if (token && !user) {
    //       return this.getUserByToken(token);
    //     } else {
    //       return of(user);
    //     }
    //   }),
    // );
    this.token = this.token$.asObservable().pipe(
      switchMap((token) => {
        if (!token) {
          return of(this.cookieService.get('token'));
        }
        return of(token);
      }),
    );
  }

  // private getUserByToken(token: string) {
  //   return of(null).pipe(
  //     tap(() => {
  //       // this.setUser(true);
  //     })
  //   );
  // }

  // private setUser(token: string) {
  private setToken(token: string) {
    this.cookieService.delete('token', '/');
    if (token) {
      const dayLong = 1000 * 60 * 60 * 24;
      const tomorrow = new Date(Date.now() + dayLong);
      this.cookieService.set('token', token, tomorrow, '/');
    }
    this.token$.next(token);
    // this.user$.next(token);
  }

  private logOut() {
    // this.setUser(null);
    this.setToken(null);
    this.router.navigateByUrl('/login');
  }
}
