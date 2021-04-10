import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../../services';

@Injectable()
export class InterceptorSpinnerService implements HttpInterceptor {
  public countProcesses: number = 0;
  constructor(private spinnerService: SpinnerService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let nextReq = req.clone();
    const isShowSpinner: boolean = !(req.params.get('showSpinner') === 'false');
    this.addProcess(isShowSpinner);

    if (req.params.has('showSpinner')) {
      nextReq = nextReq.clone({
        params: req.params.delete('showSpinner'),
      });
    }

    return next.handle(nextReq).pipe(
      finalize(() => {
        this.removeProcess(isShowSpinner);
      }),
    );
  }

  private addProcess(isShowSpinner: boolean) {
    if (isShowSpinner) {
      this.countProcesses = this.countProcesses + 1;
    }
    if (this.countProcesses > 0) {
      this.spinnerService.showSpinner();
    }
  }

  private removeProcess(isShowSpinner: boolean) {
    if (isShowSpinner) {
      this.countProcesses = this.countProcesses - 1;
      if (this.countProcesses === 0) {
        this.spinnerService.hideSpinner();
      }
    }
  }
}
