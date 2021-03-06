import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesCtrlService } from '../../../../backend-bridge/categories-ctrl/categories-ctrl.service';
import { ICategory } from '../../../../shared/interfacces';

@Injectable({ providedIn: 'root' })
export class GetCategoryByIdResolver implements Resolve<ICategory[]> {
  constructor(private categoriesCtrl: CategoriesCtrlService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    const id = route.params.id;
    return this.categoriesCtrl.getCategoryById(id);
  }
}
