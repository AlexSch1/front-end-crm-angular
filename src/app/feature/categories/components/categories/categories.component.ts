import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ICategory} from "../../../../shared/interfacces";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public displayedColumns: string[] = ['name'];
  public dataSource: ICategory[] = [];
  constructor(private route: ActivatedRoute) {
    this.dataSource = route.snapshot.data.categories || [];
  }

  public ngOnInit(): void {
  }

}
