import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [SidenavMenuComponent],
  exports: [SidenavMenuComponent],
  imports: [CommonModule, MatIconModule, RouterModule, MatRippleModule],
})
export class NavigationModule {}
