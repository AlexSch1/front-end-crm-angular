import {Injectable} from "@angular/core";
import {
  CanActivate,
  CanActivateChild, CanLoad,
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../services";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService) {
  }
  public canActivate(): Observable<boolean> {
    return this.authService.ifLoadUser();
  }

  public canLoad(): Observable<boolean> {
    return this.authService.ifLoadUser();
  }

  public canActivateChild(): Observable<boolean> {
    return this.authService.ifLoadUser();
  }
}
