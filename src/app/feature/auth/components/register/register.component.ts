import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { AuthService } from '../../../../core/user/services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy, OnInit {
  public formGroup: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(4)]],
  });
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public submit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.formGroup.disable();

    this.authService
      .register(this.formGroup.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => {
          this.formGroup.reset();
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true,
            },
          });
        },
        (error) => {
          this.openSnackBar(error.error.message, 'X');
          this.formGroup.enable();
        },
      );
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  public ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params: Params) => {
        if (params.registered) {
          this.openSnackBar('Успешная регистрация', 'X');
        } else if (params.accessDenied) {
          this.openSnackBar('Need login', 'X');
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
