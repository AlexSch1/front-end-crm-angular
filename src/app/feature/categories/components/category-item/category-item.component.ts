import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../../shared/interfacces';
import { Observable, Subject } from 'rxjs';
import { CategoriesCtrlService } from '../../../../backend-bridge/categories-ctrl/categories-ctrl.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../../../shared/modal/services/modal/modal.service';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  public isNew: boolean = true;
  public form: FormGroup;
  public image: File;
  public imagePreview: ArrayBuffer | string = '';
  public category: ICategory;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('inpFile') public inpFileRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private location: Location,
    private categoriesService: CategoriesCtrlService,
    private modal: ModalService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.initForm();
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data.categoryItem) {
        this.isNew = false;
        this.fillForm(data.categoryItem);
      }
    });
  }

  public fillForm(categoryItem: ICategory) {
    this.category = categoryItem;
    this.form.patchValue({
      name: categoryItem.name,
    });
    this.imagePreview = categoryItem.imageSrc;
  }

  public initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
    });
  }

  public ngOnInit(): void {}

  openDialog() {
    this.modal.openDialog('Сохранено');
    this.modal.dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((onAction) => {
        this.location.back();
      });
  }

  public deleteCategory() {
    this.modal.openDialog('Удалить?', true);
    this.modal.dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((onAction) => {
        if (!onAction) {
          return;
        }
        this.categoriesService.delete(this.category._id).subscribe(
          (res) => {
            this.openSnackBar(res.message, 'X');
          },
          (error) => {
            this.openSnackBar(error.error.message, 'X');
          },
          () => {
            this.router.navigate(['/categories']);
          },
        );
      });
  }
  public onSubmit() {
    let obs$: Observable<any>;
    this.form.disable();

    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(
        this.category._id,
        this.form.value.name,
        this.image,
      );
    }

    obs$.subscribe(
      (category) => {
        this.form.enable();
        // this.materialService.toast('сохранено');
        this.openDialog();
        this.category = category;
      },
      (error) => {
        this.openSnackBar(error.error.message, 'X');
        this.form.enable();
      },
    );
  }
  public onFileUpload(eo) {
    const file = eo.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
  public triggerClick() {
    this.inpFileRef.nativeElement.click();
  }
  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
