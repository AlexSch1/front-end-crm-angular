import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from "./components/categories/categories.component";
import {FetchCategoriesResolver} from "./resolvers";


const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      categories: FetchCategoriesResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
