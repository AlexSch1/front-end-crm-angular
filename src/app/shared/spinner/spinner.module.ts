import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { InterceptorSpinnerService } from './interceptors';
import { SpinnerService } from './services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorSpinnerService,
      multi: true,
    },
    SpinnerService,
  ],
})
export class SpinnerModule {
  // public static forRoot() {
  //   return {
  //     ngModule: SpinnerModule,
  //
  //   };
  // }
}
