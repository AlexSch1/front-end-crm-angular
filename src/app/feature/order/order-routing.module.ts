import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderComponent} from "./components";


const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }