import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/user/services';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy, OnInit {
  public formGroup: FormGroup = this.fb.group({
    email: ['alex@mail.com', [Validators.required, Validators.email]],
    password: ['qwer', [Validators.required, Validators.minLength(4)]],
  });
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  public submit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.formGroup.disable();

    this.authService
      .login(this.formGroup.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => {
          this.formGroup.enable();
          this.router.navigate(['/overview']);
        },
        (error) => {
          this.openSnackBar(error.error.message, 'X');
          this.formGroup.enable();
        },
      );
  }

  public ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params: Params) => {
        if (params.registered) {
          this.openSnackBar('Теперь можно войти в систему', 'X');
        } else if (params.accessDenied) {
          this.openSnackBar('Надо авторизоваться', 'X');
        } else if (params.sessionFailed) {
          this.openSnackBar('Надо перелогиниться', 'X');
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
