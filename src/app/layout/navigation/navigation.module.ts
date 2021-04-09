import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [SidenavMenuComponent],
  exports: [SidenavMenuComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ]
})
export class NavigationModule { }
