import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesCtrlService } from '../../../../backend-bridge/categories-ctrl/categories-ctrl.service';
import {ICategory, IPosition} from '../../../../shared/interfacces';
import {PositionsCtrlService} from "../../../../backend-bridge/positions-ctrl/positions-ctrl.service";

@Injectable({ providedIn: 'root' })
export class FetchPositionsResolver implements Resolve<ICategory[]> {
  constructor(private positionsCtrl: PositionsCtrlService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<IPosition[]> | Promise<any> | any {
    const id = route.params.id;
    return this.positionsCtrl.fetchPositions(id);
  }
}
