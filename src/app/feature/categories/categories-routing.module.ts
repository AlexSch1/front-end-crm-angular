import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { FetchCategoriesResolver } from './resolvers';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { GetCategoryByIdResolver } from './resolvers/get-category-by-id/get-category-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      categories: FetchCategoriesResolver,
    },
  },
  {
    path: 'new',
    component: CategoryItemComponent,
  },
  {
    path: ':id',
    component: CategoryItemComponent,
    resolve: {
      categoryItem: GetCategoryByIdResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
