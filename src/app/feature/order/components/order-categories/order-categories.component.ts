import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../../shared/interfacces';
import { Observable } from 'rxjs';
import { CategoriesCtrlService } from '../../../../backend-bridge/categories-ctrl/categories-ctrl.service';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss'],
})
export class OrderCategoriesComponent implements OnInit {
  public categories$: Observable<ICategory[]>;
  constructor(private categoriesService: CategoriesCtrlService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetchCategories();
  }
}
