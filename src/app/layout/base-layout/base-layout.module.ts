import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './components/base-layout';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
  declarations: [BaseLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    NavigationModule,
  ],
  exports: [BaseLayoutComponent],
})
export class BaseLayoutModule {}
