import { Component } from '@angular/core';
import {AuthService} from "../../../../core/user/services";

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent {
  constructor(private authService: AuthService) { }


  public logout(eo: Event) {
    eo.preventDefault();
    this.authService.logOut();
  }
}
