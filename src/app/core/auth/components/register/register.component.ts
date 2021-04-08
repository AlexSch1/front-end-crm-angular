import {Component, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReplaySubject} from "rxjs";
import {AuthService} from "../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  public formGroup: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(4)]],
  });
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public submit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.formGroup.disable();

    this.authService.register(this.formGroup.value)
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.formGroup.reset();
        this.router.navigate(['/login']);
      }, (error => {
        this.formGroup.enable();
      }))
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
