import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ICategory} from "../../../../shared/interfacces";
import {CategoriesCtrlService} from "../../../../backend-bridge/categories-ctrl/categories-ctrl.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public displayedColumns: string[] = ['name'];
  // public dataSource: ICategory[] = [];
  public categories$: Observable<ICategory[]>
  constructor(private route: ActivatedRoute, private categoriesService: CategoriesCtrlService) {
    // this.dataSource = route.snapshot.data.categories || [];
  }

  public ngOnInit(): void {
    this.categories$ = this.categoriesService.fetchCategories();
  }

}
